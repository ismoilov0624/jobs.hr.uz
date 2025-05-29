"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./companies.scss";
import L from "leaflet";
import { Link } from "react-router-dom";
import comp from "../../assets/comp.svg";
import { useScrollTop } from "../../hooks/useScrollTop";
import { useOrganizations } from "../../hooks/useOrganizations";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const activeIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Companies = () => {
  useScrollTop(0);
  const { data: organizations = [], isLoading, error } = useOrganizations();

  const [activeLocation, setActiveLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([
    40.6273554119504, 72.2412747672116,
  ]); // Default center
  const [mapZoom, setMapZoom] = useState(10);

  // Birinchi tashkilotni active qilish
  useEffect(() => {
    if (organizations.length > 0 && !activeLocation) {
      const firstOrg = organizations[0];
      setActiveLocation(firstOrg.id);
      setMapCenter([firstOrg.latitude, firstOrg.longitude]);
      setMapZoom(15);
    }
  }, [organizations, activeLocation]);

  const handleLocationClick = (id, latitude, longitude) => {
    setActiveLocation(id);
    setMapCenter([latitude, longitude]);
    setMapZoom(16);
  };

  const MapController = ({ center, zoom }) => {
    const map = useMap();

    useEffect(() => {
      map.flyTo(center, zoom, {
        duration: 1.5,
        easeLinearity: 0.25,
        animate: true,
      });
    }, [center, zoom, map]);

    return null;
  };

  // Avatar URL ni tekshirish va to'g'ri formatda qaytarish
  const getAvatarUrl = (avatar) => {
    if (!avatar || avatar === "rasm") return null;

    // Agar URL to'g'ri formatda bo'lsa
    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
      return avatar;
    }

    return null;
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="map-container">
          <div className="loading-state">
            <p>Tashkilotlar yuklanmoqda...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="map-container">
          <div className="error-state">
            <p>Xatolik yuz berdi: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="map-container">
        <div className="breadcrumb">
          <Link className="breadcrumb-item" to="/">
            Bosh sahifa
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">Tashkilotlar</span>
        </div>

        <div className="map-content">
          <div className="location-list">
            {organizations.map((organization) => {
              const avatarUrl = getAvatarUrl(organization.avatar);

              return (
                <div
                  key={organization.id}
                  className={`location-item ${
                    organization.id === activeLocation ? "active" : ""
                  }`}
                  onClick={() =>
                    handleLocationClick(
                      organization.id,
                      organization.latitude,
                      organization.longitude
                    )
                  }
                >
                  <div className="location-logo">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl || "/placeholder.svg"}
                        alt={`${organization.title} logo`}
                        className="organization-avatar"
                        onError={(e) => {
                          // Agar rasm yuklanmasa, default icon ko'rsatish
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "block";
                        }}
                      />
                    ) : null}
                    <img
                      src={comp || "/placeholder.svg"}
                      alt="Default organization icon"
                      className="default-icon"
                      style={{ display: avatarUrl ? "none" : "block" }}
                    />
                  </div>
                  <div className="location-info">
                    <h3>{organization.title}</h3>
                    <p>{organization.address}</p>
                  </div>
                  <div className="external-link">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333"
                        stroke="#666"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 2H14V6"
                        stroke="#666"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.66667 9.33333L14 2"
                        stroke="#666"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="map-view">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              zoomControl={false}
              style={{ height: "100%", width: "100%" }}
            >
              <MapController center={mapCenter} zoom={mapZoom} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | &copy; Nextech'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Barcha tashkilotlar uchun markerlar */}
              {organizations.map((org) => (
                <Marker
                  key={org.id}
                  position={[org.latitude, org.longitude]}
                  icon={
                    org.id === activeLocation
                      ? activeIcon
                      : new L.Icon({
                          iconUrl:
                            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                          iconRetinaUrl:
                            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
                          shadowUrl:
                            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                          iconSize: [20, 33],
                          iconAnchor: [10, 33],
                          popupAnchor: [1, -28],
                          shadowSize: [33, 33],
                        })
                  }
                />
              ))}
              <ZoomControl position="topright" />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
