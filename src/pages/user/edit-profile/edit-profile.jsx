import "./edit-profile.scss";
import { Link } from "react-router-dom";
import {
  User,
  Languages,
  GraduationCap,
  Briefcase,
  Users,
  MapPin,
} from "lucide-react";

export const EditProfile = () => {
  const profileSections = [
    {
      path: "/profile/information",
      label: "Ma'lumotlar",
      icon: <User size={24} />,
    },
    {
      path: "/profile/private-info",
      label: "Shaxsiy ma'lumotlar",
      icon: <MapPin size={24} />,
    },
    {
      path: "/profile/languages",
      label: "Tillar",
      icon: <Languages size={24} />,
    },
    {
      path: "/profile/education",
      label: "Ta'lim",
      icon: <GraduationCap size={24} />,
    },
    {
      path: "/profile/experience",
      label: "Ish tajribasi",
      icon: <Briefcase size={24} />,
    },
    {
      path: "/profile/relatives",
      label: "Qarindoshlar",
      icon: <Users size={24} />,
    },
  ];

  return (
    <div className="edit-profile-container">
      <div className="breadcrumb">
        <span className="breadcrumb-item">Bosh sahifa</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item">Profil</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item active">Profilni tahrirlash</span>
      </div>

      <h1 className="page-title">Profilni tahrirlash</h1>

      <div className="profile-sections-grid">
        {profileSections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className="profile-section-card"
          >
            <div className="section-icon">{section.icon}</div>
            <div className="section-label">{section.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
