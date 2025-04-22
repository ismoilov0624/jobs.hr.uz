import React from "react";
import "./personal-infos.scss";

const PersonalInfos = () => {
  return (
    <div className="personal-infos-container">
      <div className="profile-header">
        <div className="avatar-container">
          <div className="avatar">
            <div className="avatar-image"></div>
          </div>
        </div>

        <div className="profile-details">
          <h1 className="profile-name">Ism familiya</h1>
          <p className="profile-status">Ishsiz</p>
        </div>

        <div className="edit-profile-button">
          <button>Profilni tahrirlash</button>
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

      {/* New Personal Information Section */}
      <div className="personal-info-section">
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
                <span className="info-value">Nomalum</span>
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
    </div>
  );
};

export default PersonalInfos;
