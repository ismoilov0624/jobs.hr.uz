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
              title: "Farrosh",
              company: "Farg'ona Supermarket",
              location: "Farg'ona viloyati, Marg'ilon shahri",
              salary: "3 500 000 so'm",
            },
            {
              title: "Xodimlarni boshqarish bo‘yicha mutaxassis",
              company: "Farg'ona Kimyo zavodi",
              location: "Farg'ona viloyati, Farg'ona shahri",
              salary: "9 000 000 so'm",
            },
            {
              title: "Tozalovchi (ayollar uchun)",
              company: "Farg'ona City Mall",
              location: "Farg'ona viloyati, Qo'qon shahri",
              salary: "4 000 000 so'm",
            },
            {
              title: "Xavfsizlik xodimi",
              company: "Farg'ona Elektr tarmoqlari",
              location: "Farg'ona viloyati, Farg'ona shahri",
              salary: "5 000 000 so'm",
            },

            // Qolganlar
            {
              title: "Muhandis",
              company: "Asaka textile",
              location: "Andijon viloyati, Asaka tumani",
              salary: "6 500 000 so'm",
            },
            {
              title: "Buxgalter",
              company: "Asaka Akfa va Mebellar",
              location: "Andijon viloyati, Asaka tumani",
              salary: "7 000 000 so'm",
            },
            {
              title: "Qo'riqchi",
              company: "Asaka yog'",
              location: "Andijon viloyati, Asaka tumani",
              salary: "5 000 000 so'm",
            },
            {
              title: "Ishlab chiqarish ishchisi",
              company: "Asaka davr butlovchi MChJ",
              location: "Andijon viloyati, Asaka tumani",
              salary: "6 000 000 so'm",
            },
            {
              title: "Energetik",
              company: "Namangan Textile Group",
              location: "Namangan viloyati, To'raqo'rg'on tumani",
              salary: "8 000 000 so'm",
            },
            {
              title: "Sotuv bo‘yicha menejer",
              company: "Andijon Avtosavdo",
              location: "Andijon viloyati, Shahrixon tumani",
              salary: "7 500 000 so'm + bonus",
            },
            {
              title: "Yuk tashuvchi (erkaklar uchun)",
              company: "Namangan Logistics",
              location: "Namangan viloyati, Namangan shahri",
              salary: "6 000 000 so'm",
            },
            {
              title: "Tikuvchi",
              company: "Namangan Fashion",
              location: "Namangan viloyati, Chortoq tumani",
              salary: "5 500 000 so'm",
            },
            {
              title: "Oshpaz yordamchisi",
              company: "Andijon Osh markazi",
              location: "Andijon viloyati, Andijon shahri",
              salary: "5 000 000 so'm",
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
