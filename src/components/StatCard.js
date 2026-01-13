// components/StatCard.jsx
import React from "react";

const StatCard = ({ title, value, subtitle, color }) => {
    return (
        <div className="stat-card" style={{ background: color }}>
            <h4>{title}</h4>
            <h2>{value}</h2>
            <span>{subtitle}</span>
        </div>
    );
};

export default StatCard;
