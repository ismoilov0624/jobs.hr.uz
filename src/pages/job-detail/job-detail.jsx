"use client";

import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Building,
  DollarSign,
  Users,
  Calendar,
  ArrowLeft,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useScrollTop } from "../../hooks/useScrollTop";
import { fetchJobById, applyForJob } from "../../services/api/jobs";
import { useUserProfile } from "../../hooks/useUser";
import {
  formatJobType,
  formatWorkLocation,
  formatSalary,
  formatDate,
  getAvatarUrl,
} from "../../utils/formatters";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import "./job-detail.scss";

const JobDetail = () => {
  useScrollTop(0);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [isApplying, setIsApplying] = useState(false);

  const isLoggedIn = !!Cookies.get("user_token");

  const {
    data: job,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => fetchJobById(jobId),
    enabled: !!jobId,
  });

  const { data: userProfile } = useUserProfile();

  const checkProfileCompleteness = () => {
    console.log("Profile completeness check:", userProfile);

    if (!userProfile) {
      console.log("❌ User profile yo'q");
      return false;
    }

    // Required fields'ni tekshirish
    const requiredFields = {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      phoneNumber: userProfile.phoneNumber,
      address: userProfile.address,
    };

    console.log("Required fields:", requiredFields);

    const isComplete = Object.entries(requiredFields).every(([key, value]) => {
      const isValid = value && String(value).trim() !== "";
      console.log(`${key}: "${value}" - ${isValid ? "✅" : "❌"}`);
      return isValid;
    });

    console.log("Profile complete:", isComplete);
    return isComplete;
  };

  const handleApply = async () => {
    if (!isLoggedIn) {
      toast.info("Ariza topshirish uchun tizimga kiring");
      navigate("/login");
      return;
    }

    if (!checkProfileCompleteness()) {
      toast.warning("Ariza topshirish uchun avval profilingizni to'ldiring");
      navigate("/profile/edit-profile");
      return;
    }

    setIsApplying(true);
    try {
      await applyForJob(jobId);
      toast.success("Ariza muvaffaqiyatli topshirildi!");
    } catch (error) {
      console.error("Apply error:", error);
      if (error.response?.status === 409) {
        toast.warning("Siz bu ish uchun allaqachon ariza topshirgansiz");
      } else {
        toast.error("Ariza topshirishda xatolik yuz berdi");
      }
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="job-detail-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Ish ma'lumotlari yuklanmoqda...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container">
        <div className="job-detail-container">
          <div className="error-state">
            <AlertCircle size={48} />
            <h3>Ish e'loni topilmadi</h3>
            <p>Kechirasiz, bu ish e'loni mavjud emas yoki o'chirilgan</p>
            <Link to="/jobs" className="back-button">
              <ArrowLeft size={16} />
              Ish e'lonlariga qaytish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const avatarUrl = getAvatarUrl(job.organization?.avatar);

  return (
    <div className="container">
      <div className="job-detail-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link className="breadcrumb-item" to="/">
            Bosh sahifa
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link className="breadcrumb-item" to="/jobs">
            Bo'sh ish o'rinlari
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">{job.title}</span>
        </div>

        {/* Back Button */}
        <Link to="/jobs" className="back-link">
          <ArrowLeft size={16} />
          Orqaga qaytish
        </Link>

        <div className="job-detail-content">
          {/* Job Header */}
          <div className="job-header">
            <div className="job-main-info">
              <h1 className="job-title">{job.title}</h1>

              <div className="job-meta">
                <div className="job-tags">
                  <span className={`job-tag ${job.type?.toLowerCase()}`}>
                    {formatJobType(job.type)}
                  </span>
                  <span
                    className={`job-tag ${job.workLocation?.toLowerCase()}`}
                  >
                    {formatWorkLocation(job.workLocation)}
                  </span>
                  {job.gender !== "BOTH" && (
                    <span className="job-tag gender">
                      {job.gender === "MALE" ? "Erkak" : "Ayol"}
                    </span>
                  )}
                </div>

                <div className="job-stats">
                  <div className="stat-item">
                    <DollarSign size={18} />
                    <span className="salary">{formatSalary(job.salary)}</span>
                  </div>
                  <div className="stat-item">
                    <Calendar size={18} />
                    <span>E'lon qilingan: {formatDate(job.createdAt)}</span>
                  </div>
                  <div className="stat-item">
                    <Users size={18} />
                    <span>Hozircha ariza topshirilmagan</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="job-actions">
              <button
                className="apply-button"
                onClick={handleApply}
                disabled={isApplying}
              >
                {isApplying ? "Topshirilmoqda..." : "Ariza topshirish"}
              </button>
            </div>
          </div>

          <div className="job-body">
            {/* Organization Info */}
            <div className="organization-section">
              <h2>Tashkilot haqida</h2>
              <div className="organization-card">
                <div className="organization-header">
                  <div className="organization-logo">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl || "/placeholder.svg"}
                        alt={`${job.organization?.title} logo`}
                        className="organization-avatar"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="organization-placeholder"
                      style={{ display: avatarUrl ? "none" : "flex" }}
                    >
                      <Building size={32} />
                    </div>
                  </div>
                  <div className="organization-info">
                    <h3>{job.organization?.title}</h3>
                    <div className="organization-location">
                      <MapPin size={16} />
                      <span>{job.organization?.address}</span>
                    </div>
                    {job.organization?.description && (
                      <p className="organization-description">
                        {job.organization.description}
                      </p>
                    )}
                  </div>
                </div>
                <Link
                  to={`/organizations/${job.organization?.id}`}
                  className="view-organization"
                >
                  Tashkilotni ko'rish
                  <ExternalLink size={16} />
                </Link>
              </div>
            </div>

            {/* Job Details */}
            <div className="job-details">
              <div className="detail-section">
                <h2>Ish haqida ma'lumot</h2>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Lavozim:</label>
                    <span>{job.position || "Ko'rsatilmagan"}</span>
                  </div>
                  <div className="detail-item">
                    <label>Bo'lim:</label>
                    <span>{job.department || "Ko'rsatilmagan"}</span>
                  </div>
                  <div className="detail-item">
                    <label>Mutaxassislik:</label>
                    <span>{job.speciality || "Ko'rsatilmagan"}</span>
                  </div>
                  <div className="detail-item">
                    <label>Ish vaqti:</label>
                    <span>{job.workSchedule}</span>
                  </div>
                  <div className="detail-item">
                    <label>Boshlanish sanasi:</label>
                    <span>{formatDate(job.startDate)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Tugash sanasi:</label>
                    <span>{formatDate(job.endDate)}</span>
                  </div>
                </div>
              </div>

              {job.description && (
                <div className="detail-section">
                  <h2>Tavsif</h2>
                  <div className="content-text">
                    {job.description.split("\n").map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              )}

              {job.requirements && (
                <div className="detail-section">
                  <h2>Talablar</h2>
                  <div className="content-text">
                    {job.requirements.split("\n").map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              )}

              {job.responsibilities && (
                <div className="detail-section">
                  <h2>Mas'uliyatlar</h2>
                  <div className="content-text">
                    {job.responsibilities.split("\n").map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              )}

              {job.conditions && (
                <div className="detail-section">
                  <h2>Ish sharoitlari</h2>
                  <div className="content-text">
                    {job.conditions.split("\n").map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Apply Button */}
          <div className="bottom-apply">
            <button
              className="apply-button large"
              onClick={handleApply}
              disabled={isApplying}
            >
              {isApplying ? "Topshirilmoqda..." : "Ariza topshirish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
