import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./jobs.scss";
import { Link } from "react-router-dom";

export default function Jobs() {
  return (
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
          <input type="text" placeholder="Izlash..." className="search-input" />
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
        <p className="no-results-message">Bo'sh ish o'rni topilmadi</p>
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
  );
}
