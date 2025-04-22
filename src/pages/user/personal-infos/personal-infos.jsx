import React from "react";
import "./personal-infos.scss";

export default function JobSearch() {
  return (
    <div className="personal-infos-container">
      <div className="profile-header">
        <div className="avatar-container">
          <div className="avatar">
            <div className="avatar-image"></div>
          </div>
        </div>

        <div className="profile-details">
          <h1 className="profile-name">Ism Familiya </h1>
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
    </div>
  );
}
