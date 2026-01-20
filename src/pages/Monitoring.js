import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dropdown from "../components/dropdown";

const BACKEND_URL = `http://${window.location.hostname}:4002`;

const Monitoring = () => {
  const navigate = useNavigate();
  const { nodeName } = useParams();

  const user = localStorage.getItem("user");

  const [nodes, setNodes] = useState([]);
  const [iframeSrc, setIframeSrc] = useState("");
  const [loading, setLoading] = useState(true);

  /* ===== AUTH CHECK ===== */
  useEffect(() => {
    const token = localStorage.getItem("userdbtoken");
    if (!token) navigate("/login");
  }, [navigate]);

  /* ===== FETCH NODE DATA ===== */
  useEffect(() => {
    setLoading(true);

    fetch(`${BACKEND_URL}/api/node-data`)
      .then(res => res.json())
      .then(data => setNodes(Array.isArray(data) ? data : []))
      .catch(err => console.error("Failed to fetch nodes", err))
      .finally(() => setLoading(false));
  }, []);

  /* ===== ROUTE → NODE IP → IFRAME ===== */
  useEffect(() => {
    if (!nodeName || nodes.length === 0) return;

    const node = nodes.find(
      n => n.node_name === nodeName && n.status === "online"
    );

    if (node) {
      setIframeSrc(`http://${node.ip_address}:5511`);
    } else {
      navigate("/404")
    }
  }, [nodeName, nodes]);

  /* ===== FULL PAGE LOADING ===== */
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      
        <img src="/progress-bar.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0b0f14] overflow-hidden">
      <Sidebar activeItem="Monitoring" />

      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Navbar activeItem="Monitoring" user={user} />

        <div className="p-3 bg-[#0b0f14] border-b border-gray-700">
          <Dropdown />
        </div>

        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            className="w-full h-full border-none"
            title="Node Dashboard"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No online node selected
          </div>
        )}
      </div>
    </div>
  );
};

export default Monitoring;
