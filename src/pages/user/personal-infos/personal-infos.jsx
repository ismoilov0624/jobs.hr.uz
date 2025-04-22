import React, { useState } from "react";
import "./personal-infos.scss";

const PersonalInfos = () => {
  const [activeTab, setActiveTab] = useState({
    education: 0,
    work: 0,
    language: 0,
    recommendations: 0,
    staffRecommendations: 0,
  });

  const handleTabClick = (section, index) => {
    setActiveTab((prev) => ({
      ...prev,
      [section]: index,
    }));
  };

  const renderTabSection = (title, section, tabs, hasAddButton = true) => {
    return (
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          {/* {hasAddButton && (
            <button className="add-button">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15M1 8H15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Qo'shish
            </button>
          )} */}
        </div>
        <div className="section-card">
          <div className="tabs-container">
            <div className="tabs">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`tab ${
                    activeTab[section] === index ? "active" : ""
                  }`}
                  onClick={() => handleTabClick(section, index)}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>

          <div className="section-content">
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
              <p className="empty-text">Ma'lumot yo'q</p>
              {/* {hasAddButton && (
                <button className="add-data-button">Ma'lumot qo'shish</button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="personal-infos-container">
      <div className="profile-header">
        <div className="avatar-container">
          <div className="avatar">
            <div className="avatar-image"></div>
            <div className="avatar-upload">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16L12 8M8 12L16 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="profile-details">
          <h1 className="profile-name">Ism familiya</h1>
          <p className="profile-status">Ishsiz</p>
        </div>

        <div className="edit-profile-button">
          <button>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="edit-icon"
            >
              <path
                d="M11.333 2.00001C11.5081 1.82491 11.7169 1.68602 11.9465 1.5908C12.1761 1.49558 12.4224 1.44635 12.6713 1.44635C12.9202 1.44635 13.1665 1.49558 13.3961 1.5908C13.6257 1.68602 13.8345 1.82491 14.0097 2.00001C14.1848 2.17511 14.3237 2.38398 14.4189 2.61358C14.5141 2.84318 14.5634 3.08941 14.5634 3.33835C14.5634 3.58729 14.5141 3.83352 14.4189 4.06312C14.3237 4.29272 14.1848 4.50158 14.0097 4.67668L5.00001 13.6863L1.33334 14.6667L2.31374 11L11.333 2.00001Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Profilni tahrirlash
          </button>
        </div>
      </div>

      <div className="info-sections">
        <div className="info-card">
          <h2 className="card-title">Aloqa ma'lumotlari</h2>
          <div className="info-item">
            <span className="info-label">Aloqa:</span>
            <span className="info-value">Noma'lum</span>
          </div>
          <div className="info-item">
            <span className="info-label">Qo'shimcha aloqa:</span>
            <span className="info-value">Noma'lum</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">Noma'lum</span>
          </div>
        </div>

        <div className="info-card">
          <h2 className="card-title">Qo'shimcha ma'lumotlar</h2>
          <div className="info-item">
            <span className="info-label">Millat:</span>
            <span className="info-value">Noma'lum</span>
          </div>
          <div className="info-item">
            <span className="info-label">Haydovchilik guvohnomasi:</span>
            <span className="info-value">Noma'lum</span>
          </div>
          <div className="info-item">
            <span className="info-label">Manzil:</span>
            <span className="info-value">Noma'lum</span>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Sahxsiy ma'lumotlar</h2>
        <div className="personal-info-card">
          <div className="info-columns">
            <div className="info-column">
              <div className="info-item">
                <span className="info-label">Jinsi:</span>
                <span className="info-value">Noma'lum</span>
              </div>
              <div className="info-item">
                <span className="info-label">Tuman/shahar:</span>
                <span className="info-value">Noma'lum</span>
              </div>
              <div className="info-item">
                <span className="info-label">Fuqarolik:</span>
                <span className="info-value">Noma'lum</span>
              </div>
              <div className="info-item">
                <span className="info-label">Tug'ilgan kuni:</span>
                <span className="info-value">Noma'lum</span>
              </div>
            </div>

            <div className="info-column">
              <div className="info-item">
                <span className="info-label">Viloyat/shahar:</span>
                <span className="info-value">Noma'lum</span>
              </div>
              <div className="info-item">
                <span className="info-label">Tug'ilgan joyi:</span>
                <span className="info-value">Noma'lum</span>
              </div>
              <div className="info-item">
                <span className="info-label">
                  Shaxsiy avtomobilingiz bormi?:
                </span>
                <span className="info-value">Yoq</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderTabSection("Ta'lim", "education", [
        "Ta'lim muassasasi",
        "Ilmiy daraja",
        "Ta'lim yo'nalishi",
        "Boshlanishi",
        "Tamomlanishi",
        "Hozirgacha",
      ])}

      {renderTabSection("Ish tajribasi", "work", [
        "Tashkilot",
        "Lavozim vazifalari",
        "Boshlanishi",
        "Tamomlanishi",
        "Hozirgacha",
      ])}

      {renderTabSection("Tillar", "language", [
        "Tillar",
        "O'qish",
        "So'zlashish",
        "Tinglash",
        "Yozish",
      ])}

      {renderTabSection("Tavsiyalar", "recommendations", [
        "FIO",
        "Telefon",
        "Ish joyi va vazifasi",
      ])}

      {renderTabSection("Tavsiya bergan hodimlar", "staffRecommendations", [
        "FIO",
        "Telefon",
        "Ish joyi va vazifasi",
      ])}
    </div>
  );
};

export default PersonalInfos;
