"use client";

import { X } from "lucide-react";
import "./job-filters.scss";

const JobFilters = ({ filters, organizations, onFilterChange, onClose }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  return (
    <div className="job-filters">
      <div className="filters-header">
        <h3>Filtrlar</h3>
        <button className="close-filters" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="filters-content">
        {/* Tashkilot filtri */}
        <div className="filter-group">
          <label>Tashkilot</label>
          <select
            value={filters.organizationId}
            onChange={(e) =>
              handleFilterChange("organizationId", e.target.value)
            }
          >
            <option value="">Barcha tashkilotlar</option>
            {(organizations || []).map((org) => (
              <option key={org.id} value={org.id}>
                {org.title}
              </option>
            ))}
          </select>
        </div>

        {/* Ish turi filtri */}
        <div className="filter-group">
          <label>Ish turi</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
            <option value="">Barcha turlar</option>
            <option value="FULL_TIME">To'liq ish kuni</option>
            <option value="PART_TIME">Yarim ish kuni</option>
            <option value="FREELANCE">Frilanser</option>
            <option value="INTERNSHIP">Amaliyot</option>
          </select>
        </div>

        {/* Ish joyi filtri */}
        <div className="filter-group">
          <label>Ish joyi</label>
          <select
            value={filters.workLocation}
            onChange={(e) => handleFilterChange("workLocation", e.target.value)}
          >
            <option value="">Barcha joylar</option>
            <option value="OFFICE">Ofis</option>
            <option value="REMOTE">Masofaviy</option>
            <option value="HYBRID">Aralash</option>
          </select>
        </div>

        {/* Jinsi filtri */}
        <div className="filter-group">
          <label>Jinsi</label>
          <select
            value={filters.gender}
            onChange={(e) => handleFilterChange("gender", e.target.value)}
          >
            <option value="">Farqi yo'q</option>
            <option value="MALE">Erkak</option>
            <option value="FEMALE">Ayol</option>
            <option value="BOTH">Ikkalasi ham</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
