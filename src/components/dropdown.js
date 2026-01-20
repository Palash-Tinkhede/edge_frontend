import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Dropdown = () => {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { nodeName } = useParams();

  const BACKEND_URL = `http://${window.location.hostname}:4002`;

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/node-data`)
      .then(res => res.json())
      .then(data => {
        const nodeList = Array.isArray(data) ? data : [];
        setNodes(nodeList);
//console.log(nodes)
        const firstOnline = nodeList.find(n => n.status === "online");

        if (!nodeName && firstOnline) {
          navigate(`/monitor/${firstOnline.node_name}`, { replace: true });
        }
      })
      .catch(err => console.error("Node fetch failed", err))
      .finally(() => setLoading(false));
  }, [navigate, nodeName]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <img src="/progress-bar.gif" alt="Loading..." />
      </div>
    );
  }

  const onlineNodes = nodes.filter(n => n.status === "online");

  return (
    <select
      value={nodeName || ""}
      onChange={(e) => navigate(`/monitor/${e.target.value}`)}
      className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600"
    >
      {onlineNodes.length === 0 ? (
        <option value="" disabled>No online nodes</option>
      ) : (
        onlineNodes.map(node => (
          <option key={node._id} value={node.node_name}>
            {node.node_name}
          </option>
        ))
      )}
    </select>
  );
};

export default Dropdown;
