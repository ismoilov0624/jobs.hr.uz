import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./user-layout.scss";

export const UserLayout = () => {
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
      </div>

      <div className="user-layout__content">
        <Outlet />
      </div>
    </div>
  );
};
