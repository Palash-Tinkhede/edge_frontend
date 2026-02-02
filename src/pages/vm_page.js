import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

/* =========================
   Node Data (API-ready)
   ========================= */


const statusClass = {
  online: "text-green-400",
  warning: "text-yellow-400",
  offline: "text-red-400",
};

/* =========================
   Nodes Page (Activity Style)
   ========================= */
export default function Nodes() {
 const navigate = useNavigate();
 

useEffect(() => {
    const token = localStorage.getItem("userdbtoken")
    if (!token) navigate("/login")
  }, [navigate])

// main logic

  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem("user");
const BACKEND_URL = `/server`;

  useEffect(() => {
    const token = localStorage.getItem("userdbtoken");
    if (!token) {
      navigate("/login");
      return;
    }


    fetch(`${BACKEND_URL}/api/node-data`, {})
      .then((res) => res.json())
      .then((data) => {
       const isIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(
  window.location.hostname
);

const formatted = data.map((node) => ({
  id: node._id,
  name: node.node_name,
  status: node.status,
  role: "member",
  ip: node.ip_address,
  cpu: `${node.cpu_cores} vCPU`,
  memory: `${node.memory_gb} GB`,
  lastUpdated: new Date(node.last_updated).toLocaleString(),

  // ✅ VM management redirect logic
  link: isIP
    ? `https://${node.ip_address}/wok/login.html`
    : `${node.link}/wok/login.html`,
}));

      


        setNodes(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch nodes:", err);
      });
  }, [navigate]);
console.log(nodes)
  
  return (
  <>
    {loading ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <img
          src="/progress-bar.gif"
          alt="Loading..."
          className="w-128 h-128"
        />
      </div>
    ) : (
      <div className="flex h-screen bg-[#0b0f14] overflow-hidden">
        <Sidebar activeItem="VMs" />

        <main className="flex-1 flex flex-col ml-64 overflow-hidden">
          <Navbar activeItem="VMs" />

          <div className="flex-1 p-6 overflow-auto">
            <h2 className="text-lg font-semibold text-white mb-4">
              Node Activity
            </h2>

            <div className="bg-[#0f1318] border border-[#1f2630] rounded-lg overflow-hidden">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-[#0b0f14] text-gray-400">
                  <tr>
                    <th className="text-left px-4 py-3">Node</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Activity</th>
                    <th className="text-left px-4 py-3">Uptime</th>
                    <th className="text-left px-4 py-3">Manage VMs</th>
                  </tr>
                </thead>

                <tbody>
                  {nodes.map((node) => (
                    <tr
                      key={node.id}
                      className="border-t border-[#1f2630] hover:bg-[#161c24]"
                    >
                      <td className="px-4 py-3">
                        <a
                          href={node.status === "offline" ? undefined : `/monitor/${node.name}`}
                         
                        
                                className={`px-3 py-1 text-s font-medium  transition
                                  ${
                                    node.status === "offline"
                                      ? "text-gray-500 text-lg font-medium "
                                      : "text-blue-400 text-lg font-medium hover:underline"
                                  }
                                `}
                        >
                          {node.name}
                        </a>
                        <div className="text-lg text-gray-500">
                          {node.ip}
                        </div>
                      </td>

                      <td className={`px-4 py-3 text-lg font-medium capitalize ${statusClass[node.status]}`}>
                        ● {node.status}
                      </td>

                      <td className="px-4 py-3 text-lg text-gray-300">
                        {node.role}
                      </td>

                      <td className="px-4 py-3 text-lg text-gray-400">
                        {node.lastUpdated}
                      </td>

                      <td className="px-4 py-3">
                        <button
                                  onClick={() => window.location.href = node.link}

                                  disabled={node.status === "offline"}
                                   className={` px-3 py-1 text-lg font-medium  rounded  transition
                                                    ${
                                                      node.status === "offline"
                                                        ? "bg-gray-600/20 text-gray-500 cursor-not-allowed hover:bg-gray-600/30"
                                                        : "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                                                     }
                                            `}
                      >
                        VM Management
                      </button>

                    </td>
                    </tr>

                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    )}
  </>
);

}
