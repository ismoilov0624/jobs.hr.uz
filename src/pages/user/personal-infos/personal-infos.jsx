import React, { useState } from "react";
import "./personal-infos.scss";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useGetInfos } from "./service/query/useGetInfos";

const PersonalInfos = () => {
  const { data, isLoading } = useGetInfos();
  const navigate = useNavigate();

  const exit = () => {
    Cookies.remove("user_token");
    navigate("/", { replace: true });
  };
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

  const renderTable = (headers, section) => (
    <div className="table-wrapper">
      <table className="info-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {headers.map((_, index) => (
              <td key={index}>Ma'lumot yo'q</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderTabSection = (title, section, headers) => (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="section-card">{renderTable(headers, section)}</div>
    </div>
  );

  return (
    <div className="personal-infos-container">
      {/* Header */}
      <div className="profile-header">
        <div className="avatar-container">
          <div className="avatar">
            <div className="avatar-image"></div>
            <div className="avatar-upload">
              <svg width="24" height="24" viewBox="0 0 24 24">
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
          <h1 className="profile-name">Ism Familiya Otasining ismi</h1>
          <p className="profile-status">Ishsiz</p>
        </div>
        <div className="edit-profile-button">
          <button>
            <svg width="16" height="16" viewBox="0 0 16 16">
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

      {/* Contact & Additional Info */}
      <div className="info-sections">
        <div className="info-card">
          <h2 className="card-title">Aloqa ma'lumotlari</h2>
          <div className="info-item">
            <span className="info-label">Telefon raqami:</span>
            <span className="info-value">+998 ** *** ** **</span>
          </div>
          <div className="info-item">
            <span className="info-label">Qo'shimcha raqam:</span>
            <span className="info-value">Yo'q</span>
          </div>
          <div className="info-item">
            <span className="info-label">Elektron pochta:</span>
            <span className="info-value">example@mail.com</span>
          </div>
        </div>

        <div className="info-card">
          <h2 className="card-title">Qo'shimcha ma'lumotlar</h2>
          <div className="info-item">
            <span className="info-label">Millati:</span>
            <span className="info-value">O'zbek</span>
          </div>
          <div className="info-item">
            <span className="info-label">Haydovchilik guvohnomasi:</span>
            <span className="info-value">Bor (B, C toifalari)</span>
          </div>
          <div className="info-item">
            <span className="info-label">Yashash manzili:</span>
            <span className="info-value">
              Toshkent shahri, Chilonzor tumani
            </span>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="section">
        <h2 className="section-title">Shaxsiy ma'lumotlar</h2>
        <div className="personal-info-card">
          <div className="info-columns">
            <div className="info-column">
              <div className="info-item">
                <span className="info-label">Jinsi:</span>
                <span className="info-value">Erkak</span>
              </div>
              <div className="info-item">
                <span className="info-label">Tuman/Shahar:</span>
                <span className="info-value">Asaka</span>
              </div>
              <div className="info-item">
                <span className="info-label">Fuqarolik:</span>
                <span className="info-value">O'zbekiston</span>
              </div>
              <div className="info-item">
                <span className="info-label">Tug‘ilgan sana:</span>
                <span className="info-value">01.01.2000</span>
              </div>
            </div>
            <div className="info-column">
              <div className="info-item">
                <span className="info-label">Viloyat/Shahar:</span>
                <span className="info-value">Andijon shahri</span>
              </div>
              <div className="info-item">
                <span className="info-label">Tug‘ilgan joy:</span>
                <span className="info-value">Andijon viloyati</span>
              </div>
              <div className="info-item">
                <span className="info-label">Shaxsiy avtomobil:</span>
                <span className="info-value">Bor</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables */}
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
        "Lavozim",
        "Boshlanishi",
        "Tamomlanishi",
        "Hozirgacha",
      ])}
      {renderTabSection("Tillar", "language", [
        "Til",
        "O'qish",
        "So'zlashish",
        "Tinglash",
        "Yozish",
      ])}
      {renderTabSection("Tavsiyalar", "recommendations", [
        "FIO",
        "Telefon",
        "Ish joyi va lavozimi",
      ])}
      {renderTabSection("Tavsiya bergan hodimlar", "staffRecommendations", [
        "FIO",
        "Ish joyi",
        "Aloqa",
      ])}
    </div>
  );
};

export default PersonalInfos;
