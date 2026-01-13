// components/OverviewCard.jsx
import React from "react";

const OverviewCard = () => {
    return (
        <div className="overview-card">
            <h3>Overview</h3>

            <div className="overview-stats">
                <div>
                    <h2>680</h2>
                    <span>Cases</span>
                </div>
                <div>
                    <h2>900</h2>
                    <span>Files</span>
                </div>
            </div>

            <div className="progress">
                <label>Case Opened</label>
                <progress value="120" max="300" />

                <label>Case Removed</label>
                <progress value="260" max="300" />

                <label>Total Files</label>
                <progress value="120" max="300" />
            </div>
        </div>
    );
};

export default OverviewCard;
