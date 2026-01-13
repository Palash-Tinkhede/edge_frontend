import React, { useEffect, useState } from "react";

const Dropdown = ({ onNodeSelect }) => {
  const [nodes, setNodes] = useState([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
const BACKEND_URL = `http://${window.location.hostname}:4002`;

 //console.log(BACKEND_URL)
  useEffect(() => {
     fetch(`${BACKEND_URL}/api/node-data`)
      .then(res => res.json())
      .then(data => {
        const nodeList = Array.isArray(data) ? data : [];
        setNodes(nodeList);

        // ✅ AUTO-SELECT FIRST ONLINE NODE
        const firstOnline = nodeList.find(
          node => node.status === "online"
        );

        if (firstOnline) {
          setSelected(firstOnline.node_name);

          if (onNodeSelect) {
            onNodeSelect(`http://${firstOnline.ip_address}:5511`);
          }
        }
      })
      .catch(err => {
        console.error("Failed to fetch node data", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [onNodeSelect]);

  const handleChange = (e) => {
    const nodeName = e.target.value;
    setSelected(nodeName);

    const node = nodes.find(
      n => n.node_name === nodeName && n.status === "online"
    );

    if (node && onNodeSelect) {
      onNodeSelect(`http://${node.ip_address}:5511`);
    }
  };

  const onlineNodes = nodes.filter(node => node.status === "online");

  /* ===== FULL PAGE LOADING ===== */
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <img src="/progress-bar.gif" alt="Loading..." className="w-128 h-128" />
      </div>
    );
  }

  return (
    <select
      value={selected}
      onChange={handleChange}
      className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600"
    >
      {onlineNodes.length === 0 ? (
        <option value="" disabled>
          No online nodes available
        </option>
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

