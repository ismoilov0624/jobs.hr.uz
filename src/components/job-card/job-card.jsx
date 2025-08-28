import {
  MapPin,
  Building,
  Users,
  Clock,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  formatJobType,
  formatWorkLocation,
  formatSalary,
  getAvatarUrl,
} from "../../utils/formatters";
import "./job-card.scss";

const JobCard = ({ job }) => {
  const avatarUrl = getAvatarUrl(job.organization?.avatar);

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-info">
          <h3 className="job-title">
            {job.title.length > 30 ? job.title.slice(0, 50) + "..." : job.title}
          </h3>

          {/* <div className="job-meta">
            <span className="application-count">
              <Users size={14} />
              Hozircha ariza topshirilmagan
            </span>
          </div> */}
          <div className="job-tags">
            <span className={`job-tag ${job.type.toLowerCase()}`}>
              {formatJobType(job.type)}
            </span>
            <span className={`job-tag ${job.workLocation.toLowerCase()}`}>
              {formatWorkLocation(job.workLocation)}
            </span>
            {job.gender !== "BOTH" && (
              <span className="job-tag gender">
                {job.gender === "MALE" ? "Erkak" : "Ayol"}
              </span>
            )}
          </div>
          <div className="job-salary">
            {/* <DollarSign size={16} /> */}
            <p>Maosh :</p>
            <span className="salary-value">{formatSalary(job.salary)}</span>
          </div>
        </div>
      </div>

      <div className="job-card-body">
        <div className="organization-info">
          <div className="organization-details">
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
                <Building size={24} />
              </div>
            </div>
            <div className="organization-text">
              <Link
                to={`/organizations/${job.organization?.id}`}
                className="organization-name"
              >
                {job.organization?.title}
              </Link>
              <div className="organization-location">
                <MapPin size={14} />
                <span>{job.organization?.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* {job.description && (
          <div className="job-description">
            <p>{job.description.substring(0, 150)}...</p>
          </div>
        )} */}
      </div>

      <div className="job-card-footer">
        {/* <div className="job-schedule">
          <Clock size={14} />
          <span>{job.workSchedule}</span>
        </div> */}
        <Link to={`/jobs/${job.id}`} className="apply-button">
          Ariza topshirish
          <ExternalLink size={16} />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
