import React, { useEffect, useState } from 'react';
import { ClusterStatusLabel } from './ClusterStatusLabel.tsx';

const StatusBadge = ({ status }) => {
  const styles = {
    running: "bg-green-500/10 text-green-400",
    degraded: "bg-orange-500/10 text-orange-400",
    inoperative: "bg-orange-500/10 text-orange-400",
    offline: "bg-red-500/10 text-red-400",
    unknown: "bg-red-500/10 text-red-400",
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

const normalizeStatus = (status) => {
  if (!status) return 'unknown';

  const s = status.toLowerCase();

  if (['running', 'degraded', 'inoperative', 'offline', 'unknown'].includes(s)) {
    return s;
  }

  return 'unknown';
};


const ActivityTable = () => {
  const [clusterData, setClusterData] = useState(null);
  const [loading, setLoading] = useState(true);
const [dcIpByIndex, setDcIpByIndex] = useState([]);

const BACKEND_URL = `/server`;


const resolveDcIpsByClusterIndex = async (clusters) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/node-data`);
    const nodeData = await res.json();

    // Build lookup: normalized node name -> ip
    const nodeIpMap = {};
    nodeData.forEach(node => {
      if (!node.node_name || !node.link) return;

      const shortName = node.node_name.split('-')[0];
      nodeIpMap[node.node_name] = node.link;
   
    });

    // Resolve DC IP per cluster index
    const dcIpMap = {};

    clusters.forEach((cluster, index) => {
      const dcNode = cluster.nodes?.find(n => n.is_dc === true);
      
      if (dcNode && nodeIpMap[dcNode.name]) {
        dcIpMap[index] = nodeIpMap[dcNode.name];
      }
    });

    setDcIpByIndex(dcIpMap);
  } catch (err) {
    console.error("Failed to resolve DC IPs:", err);
  }
};

//console.log(dcIpByIndex)

  const fetchData = () => {
    fetch(`${BACKEND_URL}/api/cluster-data`)
      .then(res => res.json())
      .then(data => {
        setClusterData(data);
          resolveDcIpsByClusterIndex(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cluster data:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <img src="/progress-bar.gif" alt="Loading..." className="w-128 h-128" />
      </div>
    );
  }

  if (!clusterData) return <p className="text-white p-4">No data available</p>;

  const cluster = clusterData;
  const nodes = cluster.nodes || [];



  return (
   <table className="activity-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #4a5568', color: '#a0aec0' }}>
          <th className="p-3">Cluster Name</th>
          <th className="p-3">Status</th>
          <th className="p-3">Nodes</th>
          <th className="p-3">Last Checked</th>
        </tr>
      </thead>

     <tbody>
  {clusterData.length === 0 ? (
    <tr>
      <td colSpan={4} style={{ textAlign: 'center', padding: '20px', color: '#a0aec0' }}>
        No clusters available
      </td>
    </tr>
  ) : (
    clusterData.map((cluster, index) => {
  const nodes = cluster.nodes || [];

  // Find DC node for THIS cluster snapshot
  const dcNode = nodes.find(n => n.is_dc === true);

  // Resolve DC IP using index-based map
  const dcIp = dcIpByIndex[index];
//console.log(dcIp)
  return (
    <tr key={index} style={{ borderBottom: '1px solid #2d3748' }}>
      {/* Cluster Name */}
      <td className="p-3">
  <a
    href={
      cluster.status === "offline" || !dcIp
        ? undefined
        : `${dcIp}/ui/cluster/${cluster.cluster?.name || cluster.name}`
    }
   
    className={`px-3 py-1 text-s font-medium rounded transition
      ${
        cluster.status === "offline"
          ? "text-gray-500 text-lg font-medium "
          : "text-blue-400 text-lg font-medium hover:underline"
      }
    `}
  >
    {cluster.cluster?.name || cluster.name}
  </a>
</td>


      {/* Status */}
      <td className="p-3">
        <StatusBadge status={cluster.status} />
      </td>

      {/* Nodes */}
      <td className="p-3">
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {nodes.length === 0 ? (
            <span style={{ color: '#a0aec0', fontSize: '0.75rem' }}>
              No nodes
            </span>
          ) : (
            nodes.map(node => (
              <span
                key={node.name}
                style={{
                  backgroundColor: '#2d3748',
                  color: '#e2e8f0',
                  padding: '2px 10px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  border: '1px solid #4a5568'
                }}
              >
                {node.name} {node.is_dc ? '(DC)' : ''}
              </span>
            ))
          )}
        </div>
      </td>

      {/* Last Checked */}
      <td className="p-3 text-gray-400" style={{ fontSize: '0.8rem' }}>
        {cluster.last_checked
          ? new Date(cluster.last_checked).toLocaleString()
          : '—'}
      </td>
    </tr>
  );
})

  )}
</tbody>

    </table>
  );
};

export default ActivityTable;
