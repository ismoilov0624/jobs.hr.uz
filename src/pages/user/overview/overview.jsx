import React from "react";
import "./overview.scss";

const Overview = () => {
  return (
    <div className="overview-container">
      <div className="breadcrumb">
        <span className="breadcrumb-item">Bosh sahifa</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item active">Overview</span>
      </div>

      <div className="overview-header">
        <h1 className="overview-title">Joriy amallar</h1>

        <div className="dropdown">
          <button className="dropdown-toggle">
            Barchasi
            <svg
              className="dropdown-arrow"
              width="12"
              height="6"
              viewBox="0 0 12 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L6 5L11 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="tabs">
        <div className="tab active">Tashkilot</div>
        <div className="tab">Ish joyi</div>
        <div className="tab">Ariza berilgan vaqt</div>
        <div className="tab">Maosh</div>
        <div className="tab">Holati</div>
        <div className="tab">Havola</div>
      </div>

      <div className="content">
        <div className="empty-state">
          <div className="empty-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 16L24 4L8 16V32L24 44L40 32V16Z"
                stroke="#E5E5E5"
                strokeWidth="2"
              />
              <path
                d="M24 22V30M8 16L24 28L40 16"
                stroke="#E5E5E5"
                strokeWidth="2"
              />
            </svg>
          </div>
          <p className="empty-text">No data</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
