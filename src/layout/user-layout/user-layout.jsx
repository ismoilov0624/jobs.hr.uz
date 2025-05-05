import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./user-layout.scss";
import { useScrollTop } from "../../hooks/useScrollTop";

export const UserLayout = () => {
  useScrollTop(0);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="user-layout container">
      <button
        className={`user-layout__burger ${isOpen ? "sidebar-open" : ""}`}
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <div className={`user-layout__sidebar ${isOpen ? "active" : ""}`}>
        <button className="user-layout__close-btn" onClick={closeSidebar}>
          ✕
        </button>

        <Link
          to="/profile"
          onClick={closeSidebar}
          className={location.pathname === "/profile" ? "active" : ""}
        >
          Umumiy
        </Link>

        <Link
          to="/profile/personal-infos"
          onClick={closeSidebar}
          className={
            location.pathname === "/profile/personal-infos" ? "active" : ""
          }
        >
          Shaxsiy ma'lumotlar
        </Link>

        <Link
          to="/profile/edit-profile"
          onClick={closeSidebar}
          className={
            location.pathname === "/profile/edit-profile" ? "active" : ""
          }
        >
          Profilni tahrirlash
        </Link>

        <Link to="">Profildan chiqish</Link>
      </div>

      <div className="user-layout__content">
        <Outlet />
      </div>
    </div>
  );
};
