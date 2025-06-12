"use client";

import { useParams, Link } from "react-router-dom";
import { MapPin, Building, ArrowLeft, ExternalLink } from "lucide-react";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import { useOrganization } from "../../hooks/useOrganizations";
import { useScrollTop } from "../../hooks/useScrollTop";
import { getAvatarUrl } from "../../utils/formatters";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./organization-detail.scss";

// Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const OrganizationDetail = () => {
  useScrollTop(0);
  const { organizationId } = useParams();

  const {
    data: organization,
    isLoading,
    error,
  } = useOrganization(organizationId);

  if (isLoading) {
    return (
      <div className="container">
        <div className="organization-detail-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Tashkilot ma'lumotlari yuklanmoqda...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !organization) {
    return (
      <div className="container">
        <div className="organization-detail-container">
          <div className="error-state">
            <Building size={48} />
            <h3>Tashkilot topilmadi</h3>
            <p>Kechirasiz, bu tashkilot mavjud emas yoki o'chirilgan</p>
            <Link to="/companies" className="back-button">
              <ArrowLeft size={16} />
              Tashkilotlarga qaytish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const avatarUrl = getAvatarUrl(organization.avatar);

  return (
    <div className="container">
      <div className="organization-detail-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link className="breadcrumb-item" to="/">
            Bosh sahifa
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link className="breadcrumb-item" to="/companies">
            Tashkilotlar
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">{organization.title}</span>
        </div>

        {/* Back Button */}
        <Link to="/companies" className="back-link">
          <ArrowLeft size={16} />
          Orqaga qaytish
        </Link>

        <div className="organization-detail-content">
          {/* Organization Header */}
          <div className="organization-header">
            <div className="organization-main-info">
              <div className="organization-logo">
                {avatarUrl ? (
                  <img
                    src={avatarUrl || "/placeholder.svg"}
                    alt={`${organization.title} logo`}
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
                  <Building size={48} />
                </div>
              </div>

              <div className="organization-info">
                <h1 className="organization-title">{organization.title}</h1>
                <div className="organization-location">
                  <MapPin size={18} />
                  <span>{organization.address}</span>
                </div>
                {organization.description && (
                  <p className="organization-description">
                    {organization.description}
                  </p>
                )}
              </div>
            </div>

            <div className="organization-actions">
              <Link
                to={`/jobs?organization=${organization.id}`}
                className="view-jobs-button"
              >
                Bo'sh ish o'rinlari
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>

          {/* Map Section */}
          <div className="map-section">
            <h2>Joylashuv</h2>
            <div className="map-container">
              <MapContainer
                center={[organization.latitude, organization.longitude]}
                zoom={15}
                zoomControl={false}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[organization.latitude, organization.longitude]}
                />
                <ZoomControl position="topright" />
              </MapContainer>
            </div>
            <div className="map-info">
              <div className="address-info">
                <MapPin size={16} />
                <span>{organization.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetail;
