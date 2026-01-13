import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background:
          "radial-gradient(circle at center, rgba(255,255,255,0.06), transparent 60%), linear-gradient(135deg, #0f172a, #020617)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        color: "#e5e7eb",
      }}
    >
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h1
          style={{
            fontSize: "160px",
            fontWeight: 800,
            letterSpacing: "8px",
            margin: 0,
            color: "rgba(255,255,255,0.08)",
          }}
        >
          404
        </h1>

        <p
          style={{
            marginTop: "-40px",
            fontSize: "28px",
            fontWeight: 600,
            color: "#f9fafb",
          }}
        >
          Oops! Something went wrong
        </p>

        <p
          style={{
            marginTop: "10px",
            fontSize: "16px",
            color: "#9ca3af",
            maxWidth: "420px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "30px",
            padding: "12px 28px",
            fontSize: "15px",
            fontWeight: 500,
            color: "#ffffff",
            background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
            border: "none",
            borderRadius: "9999px",
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            boxShadow: "0 8px 20px rgba(236,72,153,0.3)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 12px 28px rgba(236,72,153,0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 8px 20px rgba(236,72,153,0.3)";
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Error404;

