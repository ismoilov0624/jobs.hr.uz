"use client";

import { useState } from "react";
import { Eye, Calendar, Building, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserApplications } from "../../../hooks/useJobs";
import {
  formatJobType,
  formatWorkLocation,
  formatSalary,
  formatDate,
} from "../../../utils/formatters";
import "./applications.scss";

const Applications = () => {
  const { data: applicationsData, isLoading, error } = useUserApplications();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Applications ma'lumotlarini to'g'ri strukturadan olish
  const applications = (() => {
    // API response strukturasini tekshirish
    if (
      applicationsData?.data?.applications &&
      Array.isArray(applicationsData.data.applications)
    ) {
      return applicationsData.data.applications;
    }

    if (Array.isArray(applicationsData?.data)) {
      return applicationsData.data;
    }

    if (Array.isArray(applicationsData)) {
      return applicationsData;
    }

    return [];
  })();

  const getStatusBadge = (status) => {
    const statusMap = {
      PENDING: { text: "Kutilmoqda", class: "pending" },
      ACCEPTED: { text: "Qabul qilindi", class: "accepted" },
      REJECTED: { text: "Rad etildi", class: "rejected" },
    };
    return statusMap[status] || { text: status, class: "unknown" };
  };

  const sortedApplications =
    applications.length > 0
      ? [...applications].sort((a, b) => {
          let aValue, bValue;

          switch (sortBy) {
            case "createdAt":
              aValue = new Date(a.createdAt);
              bValue = new Date(b.createdAt);
              break;
            case "jobTitle":
              aValue = a.job?.title || "";
              bValue = b.job?.title || "";
              break;
            case "organization":
              aValue = a.organization?.title || "";
              bValue = b.organization?.title || "";
              break;
            case "status":
              aValue = a.status;
              bValue = b.status;
              break;
            default:
              return 0;
          }

          if (sortOrder === "asc") {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        })
      : [];

  if (isLoading) {
    return (
      <div className="applications-container">
        <div className="applications-header">
          <h1>Mening arizalarim</h1>
        </div>
        <div className="loading-state">
          <p>Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="applications-container">
        <div className="applications-header">
          <h1>Mening arizalarim</h1>
        </div>
        <div className="error-state">
          <p>Arizalarni yuklashda xatolik yuz berdi</p>
          <p style={{ fontSize: "14px", color: "#666" }}>
            {error.message || "Noma'lum xatolik"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="applications-container">
      <div className="applications-header">
        <h1>Mening arizalarim</h1>
        <div className="applications-stats">
          <div className="stat-item">
            <span className="stat-number">{applications.length}</span>
            <span className="stat-label">Jami arizalar</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {applications.filter((app) => app.status === "PENDING").length}
            </span>
            <span className="stat-label">Kutilmoqda</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {applications.filter((app) => app.status === "ACCEPTED").length}
            </span>
            <span className="stat-label">Qabul qilindi</span>
          </div>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-content">
            <Building size={64} />
            <h3>Hali hech qanday ariza topshirmadingiz</h3>
            <p>
              Bo'sh ish o'rinlariga ariza topshiring va karyerangizni boshlang
            </p>
            <Link to="/jobs" className="browse-jobs-button">
              Ish o'rinlarini ko'rish
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="table-controls">
            <div className="sort-controls">
              <label>Saralash:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="createdAt">Sana bo'yicha</option>
                <option value="jobTitle">Ish nomi bo'yicha</option>
                <option value="organization">Tashkilot bo'yicha</option>
                <option value="status">Holat bo'yicha</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="desc">Kamayish tartibida</option>
                <option value="asc">O'sish tartibida</option>
              </select>
            </div>
          </div>

          <div className="applications-table-container">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Ish nomi</th>
                  <th>Tashkilot</th>
                  <th>Ish turi</th>
                  <th>Ish joyi</th>
                  <th>Maosh</th>
                  <th>Ariza sanasi</th>
                  <th>Holat</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {sortedApplications.map((application) => {
                  const statusBadge = getStatusBadge(application.status);
                  return (
                    <tr key={application.id}>
                      <td>
                        <div className="job-info">
                          <h4>
                            {application.job?.title || "Ish nomi mavjud emas"}
                          </h4>
                          {application.job?.department && (
                            <span className="department">
                              {application.job.department}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="organization-info">
                          <span className="org-name">
                            {application.organization?.title ||
                              "Tashkilot nomi mavjud emas"}
                          </span>
                          {application.organization?.address && (
                            <div className="org-location">
                              <MapPin size={12} />
                              <span>{application.organization.address}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`job-type-badge ${
                            application.job?.type?.toLowerCase() || "unknown"
                          }`}
                        >
                          {formatJobType(application.job?.type)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`work-location-badge ${
                            application.job?.workLocation?.toLowerCase() ||
                            "unknown"
                          }`}
                        >
                          {formatWorkLocation(application.job?.workLocation)}
                        </span>
                      </td>
                      <td>
                        <div className="salary-info">
                          <span>{formatSalary(application.job?.salary)}</span>
                        </div>
                      </td>
                      <td>
                        <div className="date-info">
                          <Calendar size={14} />
                          <span>{formatDate(application.createdAt)}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${statusBadge.class}`}>
                          {statusBadge.text}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          <Link
                            to={`/jobs/${
                              application.job?.id || application.jobId
                            }`}
                            className="action-button view"
                          >
                            <Eye size={16} />
                            <span>Ko'rish</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Applications;
