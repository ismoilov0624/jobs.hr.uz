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
import comp_logo from "../../assets/comp_logo.png";
import { useScrollTop } from "../../hooks/useScrollTop";

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

const locations = [
  {
    id: 1,
    name: "Asaka textile",
    address: "Andijon viloyati, Asaka tumani",
    logo: "/src/assets/comp_logo.png",
    position: [40.6273554119504, 72.2412747672116],
    active: true,
  },
  {
    id: 2,
    name: "Akfa eshik romlari",
    address: "Andijon viloyati, Asaka tumani",
    logo: "/roodell-logo.svg",
    position: [40.69166488693933, 72.28015231459541],
  },
  {
    id: 3,
    name: "Asaka davr butlovchi MChJ",
    address: "Andijon viloyati, Asaka tumani",
    logo: "/adm-logo.svg",
    position: [40.61448889384213, 72.27074476062307],
  },
  {
    id: 4,
    name: "Asaka Akfa va Mebellar",
    address: "Andijon viloyati, Asaka tumani",
    logo: "/adm-logo.svg",
    position: [40.67670250558059, 72.23352119925285],
  },
  {
    id: 5,
    name: "Asaka yog'",
    address: "Andijon viloyati",
    logo: "/adm-logo.svg",
    position: [40.647518508252155, 72.25439077596566],
  },
  {
    id: 6,
    name: "Asaka tuman yoshlar kichik sanoati",
    address: "Jizzax viloyati, Sh.Rashidov tumani",
    logo: "/adm-logo.svg",
    position: [40.66658135655309, 72.27242718391031],
  },
];

const Companies = () => {
  useScrollTop(0);
  const [activeLocation, setActiveLocation] = useState(1);
  const [mapCenter, setMapCenter] = useState(
    locations.find((loc) => loc.id === 1).position
  );
  const [mapZoom, setMapZoom] = useState(15);

  const handleLocationClick = (id, position) => {
    setActiveLocation(id);
    setMapCenter(position);
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

  return (
    <div className="container">
      <div className="map-container">
        <div className="breadcrumb">
          <Link to="/">Bosh sahifa</Link> / <span>Tashkilotlar</span>
        </div>

        <div className="map-content">
          <div className="location-list">
            {locations.map((location) => (
              <div
                key={location.id}
                className={`location-item ${
                  location.id === activeLocation ? "active" : ""
                }`}
                onClick={() =>
                  handleLocationClick(location.id, location.position)
                }
              >
                <div className="location-logo">
                  {/* {location.id === 2 ? (
                    <img
                      src={comp_logo}
                      alt="ROODELL logo"
                      className="roodell-logo"
                    />
                  ) :
                   (
                    <img src={comp_logo} alt="ADM logo" className="adm-logo" />
                  )} */}
                </div>
                <div className="location-info">
                  <h3>{location.name}</h3>
                  <p>{location.address}</p>
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
            ))}
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
              <Marker
                position={
                  locations.find((loc) => loc.id === activeLocation).position
                }
                icon={activeIcon}
              />
              <ZoomControl position="topright" />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
