"use client";

import { Link } from "react-router-dom";
import {
  User,
  FileText,
  Briefcase,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserApplications } from "../../../services/api/jobs";
import "./overview.scss";

const Overview = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userApplications"],
    queryFn: fetchUserApplications,
    retry: false,
    refetchOnWindowFocus: false,
  });

  console.log("Overview - Raw data:", data);
  console.log("Overview - Is loading:", isLoading);
  console.log("Overview - Error:", error);

  // Handle different response structures more carefully
  let applications = [];

  if (data) {
    if (Array.isArray(data)) {
      applications = data;
    } else if (data.data && Array.isArray(data.data.applications)) {
      applications = data.data.applications;
    } else if (data.applications && Array.isArray(data.applications)) {
      applications = data.applications;
    } else if (data.data && Array.isArray(data.data)) {
      applications = data.data;
    }
  }

  console.log("Overview - Processed applications:", applications);

  const getApplicationStats = () => {
    if (!Array.isArray(applications)) {
      return { total: 0, pending: 0, accepted: 0, rejected: 0 };
    }

    const total = applications.length;
    const pending = applications.filter(
      (app) => app.status === "PENDING"
    ).length;
    const accepted = applications.filter(
      (app) => app.status === "ACCEPTED"
    ).length;
    const rejected = applications.filter(
      (app) => app.status === "REJECTED"
    ).length;

    return { total, pending, accepted, rejected };
  };

  const stats = getApplicationStats();

  const menuItems = [
    {
      title: "Profilni tahrirlash",
      description: "Shaxsiy ma'lumotlaringizni yangilang",
      icon: User,
      link: "/profile/edit-profile",
      color: "blue",
    },
    {
      title: "Shaxsiy ma'lumotlar",
      description: "To'liq ma'lumotlaringizni ko'ring va PDF yuklab oling",
      icon: FileText,
      link: "/profile/personal-infos",
      color: "green",
    },
    {
      title: "Mening arizalarim",
      description: "Topshirgan arizalaringizni kuzatib boring",
      icon: Briefcase,
      link: "/profile/applications",
      color: "purple",
      badge: stats.total > 0 ? stats.total : null,
    },
  ];

  return (
    <div className="overview">
      <div className="overview__header">
        <h1>Profil ko'rinishi</h1>
        <p>Profilingizni boshqaring va arizalaringizni kuzatib boring</p>
      </div>

      {/* Application Statistics */}
      {!isLoading && stats.total > 0 && (
        <div className="overview__stats">
          <h2>Arizalar statistikasi</h2>
          <div className="stats-grid">
            <div className="stat-card total">
              <div className="stat-icon">
                <Briefcase size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.total}</h3>
                <p>Jami arizalar</p>
              </div>
            </div>

            <div className="stat-card pending">
              <div className="stat-icon">
                <Clock size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.pending}</h3>
                <p>Kutilmoqda</p>
              </div>
            </div>

            <div className="stat-card accepted">
              <div className="stat-icon">
                <CheckCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.accepted}</h3>
                <p>Qabul qilindi</p>
              </div>
            </div>

            <div className="stat-card rejected">
              <div className="stat-icon">
                <XCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.rejected}</h3>
                <p>Rad etildi</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="overview__actions">
        <h2>Tezkor amallar</h2>
        <div className="actions-grid">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={index}
                to={item.link}
                className={`action-card ${item.color}`}
              >
                <div className="action-header">
                  <div className="action-icon">
                    <IconComponent size={24} />
                  </div>
                  {item.badge && (
                    <span className="action-badge">{item.badge}</span>
                  )}
                </div>
                <div className="action-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="action-arrow">
                  <Eye size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Applications */}
      {!isLoading && Array.isArray(applications) && applications.length > 0 && (
        <div className="overview__recent">
          <div className="recent-header">
            <h2>So'nggi arizalar</h2>
            <Link to="/profile/applications" className="view-all">
              Barchasini ko'rish
            </Link>
          </div>
          <div className="recent-applications">
            {applications.slice(0, 3).map((application, index) => (
              <div key={application.id || index} className="application-item">
                <div className="application-info">
                  <h4>
                    {application.job?.title ||
                      application.jobTitle ||
                      "Noma'lum ish"}
                  </h4>
                  <p>
                    {application.organization?.title ||
                      application.organizationName ||
                      "Noma'lum tashkilot"}
                  </p>
                  <small>
                    {application.createdAt
                      ? new Date(application.createdAt).toLocaleDateString()
                      : ""}
                  </small>
                </div>
                <div
                  className={`application-status ${(
                    application.status || "pending"
                  ).toLowerCase()}`}
                >
                  {application.status === "PENDING" && "Kutilmoqda"}
                  {application.status === "ACCEPTED" && "Qabul qilindi"}
                  {application.status === "REJECTED" && "Rad etildi"}
                  {!application.status && "Kutilmoqda"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="overview__loading">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <p>Ma'lumotlar yuklanmoqda...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="overview__error">
          <div className="error-content">
            <XCircle size={48} />
            <h3>Ma'lumotlarni yuklashda xatolik</h3>
            <p>{error.message}</p>
            <button onClick={() => window.location.reload()}>
              Qayta urinish
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading &&
        !error &&
        (!Array.isArray(applications) || applications.length === 0) && (
          <div className="overview__empty">
            <div className="empty-content">
              <Briefcase size={64} />
              <h3>Hali hech qanday ariza topshirmadingiz</h3>
              <p>
                Bo'sh ish o'rinlariga ariza topshiring va karyerangizni boshlang
              </p>
              <Link to="/jobs" className="browse-jobs-btn">
                Ish o'rinlarini ko'rish
              </Link>
            </div>
          </div>
        )}
    </div>
  );
};

export default Overview;
