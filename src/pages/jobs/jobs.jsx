import { Search, SlidersHorizontal } from "lucide-react";
import "./jobs.scss";
import { Link } from "react-router-dom";
import { useScrollTop } from "../../hooks/useScrollTop";

export default function JobSearch() {
  useScrollTop(0);
  return (
    <div className="container">
      <div className="job-search-container">
        <div className="breadcrumb">
          <Link className="breadcrumb-item" to="/">
            Bosh sahifa
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">Ish joyi</span>
        </div>

        <div className="search-section">
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Izlash..."
              className="search-input"
            />
          </div>

          <div className="action-buttons">
            <button className="filter-button">
              <SlidersHorizontal size={18} />
              <span>Filter</span>
            </button>

            <button className="job-search-button">Ish topish</button>
          </div>
        </div>

        <div className="results-section">
          {[
            {
              title: "Sotuvchi-konsultant",
              company: "Andijon Megashop",
              location: "Andijon viloyati, Andijon shahri",
              salary: "4 500 000 so'm",
            },
            {
              title: "Elektrik",
              company: "Andijon Elektr tarmoqlari",
              location: "Andijon viloyati, Andijon shahri",
              salary: "6 000 000 so'm",
            },
            {
              title: "Maktab oshxonasi yordamchisi",
              company: "Jalaquduq 23-maktab",
              location: "Andijon viloyati, Jalaquduq tumani",
              salary: "3 800 000 so'm",
            },
            {
              title: "Bog‘cha tarbiyachisi yordamchisi",
              company: "Jalaquduq Bolalar bog‘chasi",
              location: "Andijon viloyati, Jalaquduq tumani",
              salary: "4 000 000 so'm",
            },
            {
              title: "Kassir",
              company: "Qo‘rg‘ontepa Savdo markazi",
              location: "Andijon viloyati, Qo‘rg‘ontepa tumani",
              salary: "4 200 000 so'm",
            },
            {
              title: "Qorovul",
              company: "Qo‘rg‘ontepa Avtobaza",
              location: "Andijon viloyati, Qo‘rg‘ontepa tumani",
              salary: "4 500 000 so'm",
            },
            {
              title: "Operator",
              company: "Paytug‘ Texservis",
              location: "Andijon viloyati, Paytug‘ shahri",
              salary: "5 500 000 so'm",
            },
            {
              title: "Yukchi",
              company: "Paytug‘ Agro Logistika",
              location: "Andijon viloyati, Paytug‘ shahri",
              salary: "5 000 000 so'm",
            },
            {
              title: "Marketolog",
              company: "Farg‘ona Media Group",
              location: "Farg‘ona viloyati, Farg‘ona shahri",
              salary: "7 000 000 so'm",
            },
            {
              title: "Xavfsizlik xizmati xodimi",
              company: "Farg‘ona City Plaza",
              location: "Farg‘ona viloyati, Farg‘ona shahri",
              salary: "5 500 000 so'm",
            },
            {
              title: "Tikuvchi",
              company: "Namangan Textile",
              location: "Namangan viloyati, Namangan shahri",
              salary: "5 500 000 so'm",
            },
            {
              title: "Sotuv bo‘yicha menejer",
              company: "Namangan Technomart",
              location: "Namangan viloyati, Namangan shahri",
              salary: "6 500 000 so'm + bonus",
            },
          ].map((job, index) => (
            <div key={index} className="job-card">
              <div className="job-header">
                <h3 className="job-title">{job.title}</h3>
                <p className="application-status">
                  Hozircha ariza topshirilmagan
                </p>
                <div className="job-tags">
                  <span className="job-tag full-time">To'liq ish kuni</span>
                  <span className="job-tag office">Ofisda</span>
                </div>
                <div className="job-salary">
                  <span className="salary-label">Maosh:</span>
                  <span className="salary-value">{job.salary}</span>
                </div>
              </div>

              <div className="company-info">
                <div className="company-details">
                  <h4 className="company-name">{job.company}</h4>
                  <p className="company-location">
                    <span className="location-icon"></span>
                    {job.location}
                  </p>
                </div>

                <div className="external-link">
                  <button className="link-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
