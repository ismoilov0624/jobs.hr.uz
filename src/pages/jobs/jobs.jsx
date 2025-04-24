import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./jobs.scss";
// import comp_logo from "../../assets/comp_logo.png";
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
          <div className="job-card">
            <div className="job-header">
              <h3 className="job-title">Muhandis</h3>
              <p className="application-status">
                Hozircha ariza topshirilmagan
              </p>

              <div className="job-tags">
                <span className="job-tag full-time">To'liq ish kuni</span>
                <span className="job-tag office">Ofisda</span>
              </div>

              <div className="job-salary">
                <span className="salary-label">Maosh:</span>
                <span className="salary-value">Kelishilgan holda</span>
              </div>
            </div>

            <div className="company-info">
              <div className="company-logo">
                {/* <div className="logo-container">
                  <img src={comp_logo} alt="" />
                </div> */}
              </div>

              <div className="company-details">
                <h4 className="company-name">Asaka textile</h4>
                <p className="company-location">
                  <span className="location-icon"></span>
                  Andijon viyati, Asaka tumani
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
          <div className="job-card">
            <div className="job-header">
              <h3 className="job-title">Buxgalter</h3>
              <p className="application-status">
                Hozircha ariza topshirilmagan
              </p>

              <div className="job-tags">
                <span className="job-tag full-time">To'liq ish kuni</span>
                <span className="job-tag office">Ofisda</span>
              </div>

              <div className="job-salary">
                <span className="salary-label">Maosh:</span>
                <span className="salary-value">Kelishilgan holda</span>
              </div>
            </div>

            <div className="company-info">
              <div className="company-logo">
                {/* <div className="logo-container">
                  <img src={comp_logo} alt="" />
                </div> */}
              </div>

              <div className="company-details">
                <h4 className="company-name">Asaka Akfa va Mebellar</h4>
                <p className="company-location">
                  <span className="location-icon"></span>
                  Andijon viyati, Asaka tumani
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
          <div className="job-card">
            <div className="job-header">
              <h3 className="job-title">Qo'riqchi</h3>
              <p className="application-status">
                Hozircha ariza topshirilmagan
              </p>

              <div className="job-tags">
                <span className="job-tag full-time">To'liq ish kuni</span>
                <span className="job-tag office">Ofisda</span>
              </div>

              <div className="job-salary">
                <span className="salary-label">Maosh:</span>
                <span className="salary-value">Kelishilgan holda</span>
              </div>
            </div>

            <div className="company-info">
              <div className="company-logo">
                {/* <div className="logo-container">
                  <img src={comp_logo} alt="" />
                </div> */}
              </div>

              <div className="company-details">
                <h4 className="company-name">Asaka yog'</h4>
                <p className="company-location">
                  <span className="location-icon"></span>
                  Andijon viyati, Asaka tumani
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
          <div className="job-card">
            <div className="job-header">
              <h3 className="job-title">Ishlab chiqarish ishchisi</h3>
              <p className="application-status">
                Hozircha ariza topshirilmagan
              </p>

              <div className="job-tags">
                <span className="job-tag full-time">To'liq ish kuni</span>
                <span className="job-tag office">Ofisda</span>
              </div>

              <div className="job-salary">
                <span className="salary-label">Maosh:</span>
                <span className="salary-value">Kelishilgan holda</span>
              </div>
            </div>

            <div className="company-info">
              <div className="company-logo">
                {/* <div className="logo-container">
                  <img src={comp_logo} alt="" />
                </div> */}
              </div>

              <div className="company-details">
                <h4 className="company-name">Asaka davr butlovchi MChJ</h4>
                <p className="company-location">
                  <span className="location-icon"></span>
                  Andijon viyati, Asaka tumani
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
        </div>

        <div className="pagination">
          <button className="pagination-button prev">
            <ChevronLeft size={18} />
          </button>
          <button className="pagination-button active">1</button>
          <button className="pagination-button next">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
