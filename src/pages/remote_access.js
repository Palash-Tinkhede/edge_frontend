import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

/* =========================
   Helpers
   ========================= */
const StatusBadge = ({ status }) => {
  const styles = {
    online: "bg-green-500/10 text-green-400",
    unknown: "bg-yellow-500/10 text-yellow-400",
    offline: "bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
        styles[status] || styles.unknown
      }`}
    >
      {status || "unknown"}
    </span>
  );
};

/* =========================
   Main Component
   ========================= */
export default function NodesTable() {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem("user");
const BACKEND_URL = `http://${window.location.hostname}:4002`;
  useEffect(() => {
    const token = localStorage.getItem("userdbtoken");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${BACKEND_URL}/api/node-data`, {})
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((node) => ({
          id: node._id,
          name: node.node_name,
          status: node.status, // or derive from heartbeat later
          role: "member",
          ip: node.ip_address,
          cpu: `${node.cpu_cores} vCPU`,
          memory: `${node.memory_gb} GB`,
          lastUpdated: new Date(node.last_updated).toLocaleString(),
          remote_access: `http://${node.ip_address}:3000/wetty`,
          link: `/monitor`,
        }));

        setNodes(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch nodes:", err);
      });
  }, [navigate]);
  
  return (
   <div className="flex h-screen bg-[#0b0f14] overflow-hidden">
  <Sidebar activeItem="Nodes" />

  <div className="flex-1 flex flex-col ml-64 overflow-hidden">
    <Navbar activeItem="Nodes" />

    <div className="flex-1 overflow-auto p-6">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Nodes
      </h2>

      <div className="bg-[#0f1318] border border-gray-800 rounded-lg">
        <div className="overflow-x-auto">

          {loading ? (
             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <img src="/progress-bar.gif" alt="Loading..." className="w-128 h-128" />
      </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-[#0b0f14] text-gray-400">
                <tr>
                  <th className="px-4 py-3 text-left">Node Name</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">IP</th>
                  <th className="px-4 py-3 text-left">CPU</th>
                  <th className="px-4 py-3 text-left">Memory</th>
                  <th className="px-4 py-3 text-left">Last Updated</th>
                  <th className="px-4 py-3 text-left"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800">
                {nodes.map((node) => (
                  <tr
                    key={node.id}
                    className="hover:bg-[#161c24] transition"
                  >
                    <td className="px-4 py-3">
                     
                        {node.name}
                      
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={node.status} />
                    </td>

                    <td className="px-4 py-3 text-gray-300">
                      {node.role}
                    </td>

                    <td className="px-4 py-3 font-mono text-gray-300">
                      {node.ip}
                    </td>

                    <td className="px-4 py-3 text-gray-300">
                      {node.cpu}
                    </td>

                    <td className="px-4 py-3 text-gray-300">
                      {node.memory}
                    </td>

                    <td className="px-4 py-3 text-gray-400">
                      {node.lastUpdated}
                    </td>

                    <td className="px-4 py-3">
                        <button
                                  onClick={() => window.open(node.remote_access, "_blank")}
                                  disabled={node.status === "offline"}
                                  className={`px-3 py-1 text-xs font-medium rounded transition
                                                    ${
                                                      node.status === "offline"
                                                        ? "bg-gray-600/20 text-gray-500 cursor-not-allowed"
                                                        : "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                                                     }
                                            `}
                      >
                        Access Terminal
                      </button>
                    </td>
                  </tr>
                ))}

                {nodes.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No nodes found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  </div>
</div>

  );
}

