import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

/* =========================
   Node Data (API-ready)
   ========================= */
const nodes = [
  {
    id: "node-1",
    name: "edgenode1",
    IP : "10.51.241.195",
    status: "online",
    role: "member",
    lastUpdated: "1 day ago",
    link: "https://10.51.241.195:8001/login.html",
    remote_access: "https://10.51.241.196:2224/ui/cluster/edgecluster/nodes/palash-pt7944-T"

  },
  {
    id: "node-2",
    name: "edgenode2",
    status: "online",
    IP : "10.51.241.196",
    role: "member",
    lastUpdated: "1 day ago",
    link: "https://10.51.241.196:8001/login.html",
    remote_access: "https://10.51.241.196:2224/ui/cluster/edgecluster/nodes/palash-pt7944"
  },
];

const statusClass = {
  online: "text-green-400",
  warning: "text-yellow-400",
  offline: "text-red-400",
};

/* =========================
   Nodes Page (Activity Style)
   ========================= */
export default function Nodes() {
const navigate = useNavigate()
 const user = localStorage.getItem("user")

useEffect(() => {
    const token = localStorage.getItem("userdbtoken")
    if (!token) navigate("/login")
  }, [navigate])
  return (
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
                    {/* Node */}
                    <td className="px-4 py-3">
                      <a
                        href={node.remote_access}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 text-lg font-medium hover:underline"
                      >
                        {node.name}
                      </a>
                      <div className="text-lg text-gray-500">
                        {node.IP}
                      </div>
                    </td>

                    {/* Status */}
                    <td
                      className={`px-4 py-3 text-lg font-medium capitalize ${statusClass[node.status]}`}
                    >
                      ● {node.status}
                    </td>

                    {/* Activity / Description */}
                    <td className="px-4 py-3 text-lg text-gray-300">
                      {node.role}
                    </td>

                    {/* Time */}
                    <td className="px-4 py-3 text-lg text-gray-400">
                      {node.lastUpdated}
                    </td>
                    <td className="px-4 py-3 text-gray-400" >
                      <button
                        onClick={() =>
                          window.location.href = node.link
                        }
                        className="px-3 py-1 text-lg font-medium bg-green-600/20 text-green-400 rounded hover:bg-green-600/30"
                      >
                        Manage VM
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {nodes.length === 0 && (
              <div className="text-center text-gray-400 py-6">
                No node activity available
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
