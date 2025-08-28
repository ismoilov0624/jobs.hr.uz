"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Building, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useScrollTop } from "../../hooks/useScrollTop";
import { fetchJobs } from "../../services/api/jobs";
import { useOrganizations } from "../../hooks/useOrganizations";
import JobCard from "../../components/job-card/job-card";
import JobFilters from "../../components/job-filters/job-filters";
import Pagination from "../../components/pagination/pagination";
import "./jobs.scss";

export default function Jobs() {
  useScrollTop(0);

  const [searchParams, setSearchParams] = useSearchParams();

  // State for filters and search
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    organizationId: searchParams.get("organizationId") || "",
    type: searchParams.get("type") || "",
    workLocation: searchParams.get("workLocation") || "",
    gender: searchParams.get("gender") || "",
    page: Number.parseInt(searchParams.get("page")) || 1,
    limit: 12,
  });

  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search);

  // Fetch jobs with current filters
  const {
    data: jobsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => {
      // Clean filters before sending to API
      const cleanFilters = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (
          value !== null &&
          value !== undefined &&
          value !== "" &&
          value !== 0
        ) {
          if (key === "page" && value === 1) return; // Don't send page=1
          cleanFilters[key] = value;
        }
      });

      console.log("[v0] Sending API request with filters:", cleanFilters);
      return fetchJobs(cleanFilters);
    },
    keepPreviousData: true,
    retry: 3,
    retryDelay: 1000,
    onSuccess: (data) => {
      console.log("[v0] API response received:", data);
    },
    onError: (error) => {
      console.log("[v0] API error:", error);
    },
  });

  const { data: organizations = [] } = useOrganizations();

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== "limit") {
        if (key === "page" && value === 1) return; // Don't add page=1 to URL
        params.set(key, value.toString());
      }
    });

    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = searchInput.trim();
    console.log("[v0] Search submitted:", searchTerm);
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        search: searchTerm,
        page: 1,
      };
      console.log("[v0] New filters after search:", newFilters);
      return newFilters;
    });
  };

  const handleFilterChange = (newFilters) => {
    console.log("[v0] Filter change received:", newFilters);
    setFilters((prev) => {
      const updatedFilters = {
        ...prev,
        ...newFilters,
        page: 1,
      };
      console.log("[v0] Updated filters:", updatedFilters);
      return updatedFilters;
    });
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    const newFilters = {
      search: "",
      organizationId: "",
      type: "",
      workLocation: "",
      gender: "",
      page: 1,
      limit: 12,
    };
    setFilters(newFilters);
    setSearchInput("");
  };

  const clearSingleFilter = (filterKey) => {
    if (filterKey === "search") {
      setSearchInput("");
    }
    setFilters((prev) => ({
      ...prev,
      [filterKey]: "",
      page: 1,
    }));
  };

  const hasActiveFilters =
    filters.search ||
    filters.organizationId ||
    filters.type ||
    filters.workLocation ||
    filters.gender;

  if (error) {
    return (
      <div className="container">
        <div className="job-search-container">
          <div className="error-state">
            <p>Ish e'lonlarini yuklashda xatolik yuz berdi</p>
            <button onClick={() => refetch()} className="retry-button">
              Qayta urinish
            </button>
          </div>
        </div>
      </div>
    );
  }

  // API javobini tekshirish
  let jobs = [];
  let meta = {};

  if (jobsData) {
    if (jobsData.data && Array.isArray(jobsData.data.jobs)) {
      jobs = jobsData.data.jobs;
      meta = jobsData.data.meta || {};
    } else if (jobsData.data && Array.isArray(jobsData.data)) {
      jobs = jobsData.data;
      meta = jobsData.data.meta || {};
    } else if (Array.isArray(jobsData.jobs)) {
      jobs = jobsData.jobs;
      meta = jobsData.meta || {};
    } else if (Array.isArray(jobsData)) {
      jobs = jobsData;
    }
  }

  const filteredJobs = jobs.filter((job) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const jobTitle = (job.title || "").toLowerCase();
      const companyName = (
        job.organization?.title ||
        job.company ||
        ""
      ).toLowerCase();
      const description = (job.description || "").toLowerCase();

      if (
        !jobTitle.includes(searchTerm) &&
        !companyName.includes(searchTerm) &&
        !description.includes(searchTerm)
      ) {
        return false;
      }
    }

    // Organization filter
    if (filters.organizationId) {
      if (
        job.organization?.id !== filters.organizationId &&
        job.organizationId !== filters.organizationId
      ) {
        return false;
      }
    }

    // Job type filter
    if (filters.type) {
      if (job.type !== filters.type) {
        return false;
      }
    }

    // Work location filter
    if (filters.workLocation) {
      if (job.workLocation !== filters.workLocation) {
        return false;
      }
    }

    // Gender filter
    if (filters.gender) {
      if (job.gender !== filters.gender) {
        return false;
      }
    }

    return true;
  });

  const filteredMeta = {
    ...meta,
    totalCount: filteredJobs.length,
    totalPages: Math.ceil(filteredJobs.length / filters.limit),
  };

  const startIndex = (filters.page - 1) * filters.limit;
  const endIndex = startIndex + filters.limit;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  return (
    <div className="container">
      <div className="job-search-container">
        <div className="breadcrumb">
          <Link className="breadcrumb-item" to="/">
            Bosh sahifa
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">Bo'sh ish o'rinlari</span>
        </div>

        {/* Search and Filter Section */}
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Ish nomi, tashkilot yoki kalit so'zlar..."
              className="search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="search-submit">
              Qidirish
            </button>
          </form>

          <div className="action-buttons">
            <button
              className={`filter-button ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={18} />
              <span>Filtr</span>
            </button>

            {hasActiveFilters && (
              <button className="clear-filters-button" onClick={clearFilters}>
                Barcha filtrlarni tozalash
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {/* {hasActiveFilters && (
          <div className="active-filters">
            <span className="active-filters-label">Faol filtrlar:</span>
            {filters.search && (
              <span className="filter-tag">
                Qidiruv: "{filters.search}"
                <button
                  onClick={() => clearSingleFilter("search")}
                  className="filter-remove"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.organizationId && (
              <span className="filter-tag">
                Tashkilot:{" "}
                {organizations.find((org) => org.id === filters.organizationId)
                  ?.title || "Noma'lum"}
                <button
                  onClick={() => clearSingleFilter("organizationId")}
                  className="filter-remove"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.type && (
              <span className="filter-tag">
                Tur: {filters.type}
                <button
                  onClick={() => clearSingleFilter("type")}
                  className="filter-remove"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.workLocation && (
              <span className="filter-tag">
                Joy: {filters.workLocation}
                <button
                  onClick={() => clearSingleFilter("workLocation")}
                  className="filter-remove"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.gender && (
              <span className="filter-tag">
                Jins: {filters.gender}
                <button
                  onClick={() => clearSingleFilter("gender")}
                  className="filter-remove"
                >
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        )} */}

        {/* Filters */}
        {showFilters && (
          <JobFilters
            filters={filters}
            organizations={organizations}
            onFilterChange={handleFilterChange}
            onClose={() => setShowFilters(false)}
          />
        )}

        {/* Results Header */}
        <div className="results-header">
          <div className="results-info">
            {isLoading ? (
              <p>Yuklanmoqda...</p>
            ) : (
              <p>
                <strong>{filteredMeta.totalCount || 0}</strong> ta ish e'loni
                topildi
                {filters.search && ` "${filters.search}" so'rovi bo'yicha`}
              </p>
            )}
          </div>
        </div>

        {/* Job Cards */}
        <div className="results-section">
          {isLoading ? (
            <div className="loading-grid">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="job-card-skeleton">
                  <div className="skeleton-header"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                  </div>
                  <div className="skeleton-footer"></div>
                </div>
              ))}
            </div>
          ) : paginatedJobs.length > 0 ? (
            <div className="jobs-grid">
              {paginatedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-content">
                <Building size={64} />
                <h3>Hech qanday ish e'loni topilmadi</h3>
                <p>Qidiruv shartlarini o'zgartiring yoki filtrlarni tozalang</p>
                {hasActiveFilters && (
                  <button
                    className="clear-filters-button"
                    onClick={clearFilters}
                  >
                    Barcha filtrlarni tozalash
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredMeta.totalPages > 1 && (
          <Pagination
            currentPage={filters.page || 1}
            totalPages={filteredMeta.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
