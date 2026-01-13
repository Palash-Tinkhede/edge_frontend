import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import OverviewCard from "../components/OverviewCard";
import ActivityTable from "../components/ActivityTable";
import "../styles/dashboard.css"
/* =========================
   DATA (FROM OLD DASHBOARD)
   ========================= */
const healthData = [
  { label: "Healthy", value: 4  , color: "#2ecc71" },
  { label: "Info", value: 2, color: "#3498db" },
  { label: "Notice", value: 1, color: "#f1c40f" },
  { label: "Warning", value: 2, color: "#e67e22" },
  { label: "Critical", value: 1, color: "#e74c3c" },
  { label: "Disconnected", value: 2, color: "#9b59b6" },
];

const versionData = [
  { label: "Ubuntu 24.04", value: 3, color: "#c1411bff" },
  { label: "Ubuntu 20.04", value: 1, color: "#3498db" },
  { label: "Ubuntu 22.04", value: 1, color: "#f1c40f" },
  { label: "Rocky linux9", value: 2, color: "#e67e22" },
  { label: "Rocky linux8", value: 0, color: "#e74c3c" },
  { label: "Rocky linux7", value: 0, color: "#9b59b6" },
];



/* =========================
   SVG PIE / DONUT (ORIGINAL)
   ========================= */
const PieChart = ({ data, donut }) => {
  const cx = 110;
  const cy = 110;
  const r = 90;
  const innerR = 45;

  const total = data.reduce((s, d) => s + d.value, 0);
  const nonZero = data.filter(d => d.value > 0);

  let angle = 0;

  if (total === 0) {
    return (
      <svg width="220" height="220">
        {donut && <circle cx={cx} cy={cy} r={innerR} fill="#0f1318" />}
      </svg>
    );
  }

  return (
    <svg width="220" height="220">
      {nonZero.length === 1 ? (
        <circle cx={cx} cy={cy} r={r} fill={nonZero[0].color} />
      ) : (
        data.map((item, i) => {
          if (item.value === 0) return null;

          const start = angle;
          const slice = (item.value / total) * 360;
          angle += slice;

          const largeArc = slice > 180 ? 1 : 0;

          const x1 = cx + r * Math.cos((Math.PI * start) / 180);
          const y1 = cy + r * Math.sin((Math.PI * start) / 180);
          const x2 = cx + r * Math.cos((Math.PI * (start + slice)) / 180);
          const y2 = cy + r * Math.sin((Math.PI * (start + slice)) / 180);

          return (
            <path
              key={i}
              d={`M ${cx} ${cy}
                  L ${x1} ${y1}
                  A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}
                  Z`}
              fill={item.color}
            />
          );
        })
      )}

      {donut && <circle cx={cx} cy={cy} r={innerR} fill="#0f1318" />}
    </svg>
  );
};

/* =========================
   DERIVED VALUES
   ========================= */
const totalClusters = healthData.reduce((s, i) => s + i.value, 0);
const healthyClusters = healthData.find(h => h.label === "Healthy")?.value || 0;
const warningClusters = healthData.find(h => h.label === "Warning")?.value || 0;
const totalVersions = versionData.reduce((s, i) => s + i.value, 0);

/* =========================
   DASHBOARD
   ========================= */
const Dashboard = () => {
 const navigate = useNavigate();
 const [clusterData, setClusterData] = useState(null);
 const user = localStorage.getItem("user")
    

    
    
    //const clusters = clusterData.clusters || [];


useEffect(() => {
    const token = localStorage.getItem("userdbtoken")
    if (!token) navigate("/login")
  }, [navigate])

  return (
    <div className="flex">
      <Sidebar activeItem="Dashboard" />

      <main className="ml-64 flex-1 min-h-screen bg-[#0b0f14]">
        <Navbar activeItem="Dashboard" />

        {/* Stat Cards */}
        <section className="grid grid-cols-4 gap-6 p-6">
          <StatCard title="Total Clusters" value={totalClusters} subtitle="System Health" color="#6c63ff" />
          <StatCard title="Healthy" value={healthyClusters} subtitle="Running" color="#00c9ff" />
          <StatCard title="OS Versions" value={totalVersions} subtitle="Detected" color="#4facfe" />
          <StatCard title="Warnings" value={warningClusters} subtitle="Needs Attention" color="#ff6a6a" />
        </section>

        {/* Pie Charts */}
        <section className="grid grid-cols-2 gap-6 px-6">
          <div className="bg-[#121826] rounded-xl p-4">
            <h3 className="mb-3 text-white">Health Status</h3>
            <div className="flex justify-between items-center">
              <ul className="text-sm text-gray-300 space-y-1">
                {healthData.map(h => (
                  <li key={h.label}>
                    <span style={{ background: h.color }} className="inline-block w-2 h-2 mr-2" />
                    {h.label}: {h.value}
                  </li>
                ))}
              </ul>
              <PieChart data={healthData} />
            </div>
          </div>

          <div className="bg-[#121826] rounded-xl p-4">
            <h3 className="mb-3 text-white">Version Info</h3>
            <div className="flex justify-between items-center">
              <ul className="text-sm text-gray-300 space-y-1">
                {versionData.map(v => (
                  <li key={v.label}>
                    <span style={{ background: v.color }} className="inline-block w-2 h-2 mr-2" />
                    {v.label}: {v.value}
                  </li>
                ))}
              </ul>
              <PieChart data={versionData} donut />
            </div>
          </div>
        </section>

        {/* Table */}
       <section className="p-6">
  <h3 className="mb-4 text-white">Clusters</h3>

 
    <ActivityTable  />

</section>
      </main>
    </div>
  );
};

export default Dashboard;
