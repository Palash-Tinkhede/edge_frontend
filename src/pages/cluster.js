import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

/* =========================
   STATIC DATA
   ========================= */
const clusters = [
  {
    id: 1,
    name: "edgecluster",
    status: "running",
    updated: "updated 5s ago",
    issues: 2,
    nodes: 2,
    resources: 5,
    resourceIssue: true,
    fenceDevices: 0,
    link: "https://10.51.241.196:2224/ui/cluster/edgecluster/overview"
  }
];

/* =========================
   MAIN COMPONENT
   ========================= */
export default function ClustersPage() {

 const navigate = useNavigate()
 const user = localStorage.getItem("user")

useEffect(() => {
    const token = localStorage.getItem("userdbtoken")
    if (!token) navigate("/login")
  }, [navigate])

  return (
    <div className="flex h-screen bg-[#0b0f14] overflow-hidden">
      <Sidebar activeItem="Clusters" />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <Navbar activeItem="Clusters" />
        <div className="clusters-page flex-1 overflow-auto p-6" >
          {/* Header */}
          <div className="page-header">
            <div className="left">
              <h2 style={{ color: '#e6e8eb' }}>
                Clusters
              </h2>
            </div>
          </div>

          {/* Table */}
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th className="sortable active">Clusters ↑</th>
                  <th className="sortable">Issues ⇅</th>
                  <th className="sortable">Nodes ⇅</th>
                  <th className="sortable">Resources ⇅</th>
                  <th className="sortable">Fence devices ⇅</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {clusters.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div className="cluster-name">
                        <span onClick={() => window.open(c.link, '_blank')} className="link">{c.name}</span>
                        <span className="status-pill">{c.status}</span>

                      </div>
                    </td>

                    <td>
                      <span className="count">{c.issues}</span>
                      {c.issues > 0 && (
                        <span className="warn-icon">⚠</span>
                      )}
                    </td>

                    <td className="count">{c.nodes}</td>

                    <td>
                      <span className="count">{c.resources}</span>
                      {c.resourceIssue && (
                        <span className="error-icon">●</span>
                      )}
                    </td>

                    <td className="count">{c.fenceDevices}</td>


                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="actions">
            <button onClick={() => window.open("https://10.51.241.196:2224/ui", '_blank')} className="btn primary">Manage Cluster</button>
          </div>

          {/* =========================
                 STYLES
                 ========================= */}
          <style>{`
                body {
                  margin: 0;
                  background: #0b0f14;
                  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
                  color: #e6e8eb;
                }

                .clusters-page {
                  /* padding: 24px; */
                  min-height: 100vh;
                }

                /* Header */
                .page-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-start;
                  margin-bottom: 20px;
                }

                .page-header h2 {
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  font-size: 20px;
                  font-weight: 600;
                  margin: 0;
                }

                .actions {
                  margin-top: 12px;
                  display: flex;
                  gap: 10px;
                }

                /* Buttons */
                .btn {
                  padding: 8px 14px;
                  font-size: 14px;
                  border-radius: 4px;
                  cursor: pointer;
                  border: 1px solid transparent;
                }

                .btn.primary {
                  background: #1677ff;
                  color: #fff;
                }

                .btn.outline {
                  background: transparent;
                  color: #1677ff;
                  border-color: #1677ff;
                }

                .btn.notify {
                  background: #1677ff;
                  color: #fff;
                }

                /* Pills */
                .status-pill {
                  background: rgba(46, 204, 113, 0.15);
                  color: #2ecc71;
                  padding: 2px 8px;
                  border-radius: 999px;
                  font-size: 12px;
                  text-transform: lowercase;
                }

                .updated-pill {
                  background: #0f1968;
                  border: 1px solid #1f2630;
                  padding: 2px 8px;
                  border-radius: 999px;
                  font-size: 12px;
                  color: #4ea1ff;
                }

                .updated-pill.small {
                  margin-left: 8px;
                }

                /* Table */
                .table-card {
                  background: #0f1968;
                  border: 1px solid #1f2630;
                }

                table {
                  width: 100%;
                  border-collapse: collapse;
                }

                th, td {
                  padding: 14px 16px;
                  border-bottom: 1px solid #1f2630;
                  font-size: 14px;
                }

                th {
                  text-align: left;
                  color: #9aa4b2;
                  font-weight: 500;
                }

                tr:hover {
                  background: #161c24;
                }

                /* Columns */
                .cluster-name {
                  display: flex;
                  align-items: center;
                  gap: 10px;
                }

                .link {
                  color: #4ea1ff;
                  font-weight: 500;
                  cursor: pointer;
                }

                .count {
                  color: #4ea1ff;
                }

                .warn-icon {
                  margin-left: 6px;
                  color: #f1c40f;
                }

                .error-icon {
                  margin-left: 6px;
                  color: #e74c3c;
                }

                .menu {
                  text-align: center;
                  cursor: pointer;
                  color: #9aa4b2;
                }

                .menu:hover {
                  color: #ffffff;
                }

                .sortable {
                  cursor: pointer;
                }

                .sortable.active {
                  color: #4ea1ff;
                }
              `}</style>
        </div>
      </div>
    </div>
  );
}
