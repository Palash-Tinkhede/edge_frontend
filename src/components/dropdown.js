import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Dropdown = () => {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { nodeName } = useParams();

  const BACKEND_URL = `/server`;

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/node-data`)
      .then((res) => res.json())
      .then((data) => {
        const nodeList = Array.isArray(data) ? data : [];
        setNodes(nodeList);

        // --- FIX: Auto-navigate if nodeName is missing ---
        const onlineNodes = nodeList.filter((n) => n.status === "online");
        if (!nodeName && onlineNodes.length > 0) {
          // Redirect to the first online node automatically
          navigate(`/monitor/${onlineNodes[0].node_name}`, { replace: true });
        }
      })
      .catch((err) => console.error("Node fetch failed", err))
      .finally(() => setLoading(false));
  }, [nodeName, navigate]); // Dependencies are correct

  if (loading) return null; // Don't show the full-screen loader inside a small dropdown component

  const onlineNodes = nodes.filter((n) => n.status === "online");

  return (
    <div className="flex items-center gap-2">
      <label className="text-gray-400 text-sm font-medium">Switch Node:</label>
      <select
        // Ensure value is nodeName, but fallback to empty string to avoid "uncontrolled" warnings
        value={nodeName || ""} 
        onChange={(e) => {
          if (e.target.value) {
            navigate(`/monitor/${e.target.value}`);
          }
        }}
        className="bg-[#161c24] text-blue-400 px-3 py-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer"
      >
        {/* Placeholder option if nothing is selected yet */}
        {!nodeName && <option value="">Select a node...</option>}
        
        {onlineNodes.length === 0 ? (
          <option value="" disabled>No online nodes</option>
        ) : (
          onlineNodes.map((node) => (
            <option key={node._id} value={node.node_name}>
              {node.node_name}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default Dropdown;
