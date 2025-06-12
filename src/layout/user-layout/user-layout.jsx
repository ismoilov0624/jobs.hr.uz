"use client";

import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./user-layout.scss";
import { useScrollTop } from "../../hooks/useScrollTop";
import { useLogout } from "../../hooks/useUser";
import {
  FileText,
  User,
  Edit,
  Phone,
  MessageCircle,
  LogOut,
} from "lucide-react";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

export const UserLayout = () => {
  useScrollTop(0);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const logout = useLogout();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
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

  const menuItems = [
    {
      path: "/profile",
      label: "Arizalar",
      icon: <FileText size={18} />,
    },
    {
      path: "/profile/personal-infos",
      label: "Shaxsiy ma'lumotlar",
      icon: <User size={18} />,
    },
    {
      path: "/profile/edit-profile",
      label: "Profilni tahrirlash",
      icon: <Edit size={18} />,
    },
  ];

  return (
    <>
      <Header />
      <div className="user-layout">
        <div className="container">
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

            <div className="sidebar-section">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`sidebar-link ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  title={item.label}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* <div className="sidebar-section">
              <div className="section-title">Qo'shimcha</div>
              <Link
                to="/profile/phone-change"
                className="sidebar-link"
                title="Telefon raqamini o'zgartirish"
              >
                <Phone size={18} />
                <span>Telefon raqamini o'zgartirish</span>
              </Link>
              <Link
                to="/profile/telegram-bot"
                className="sidebar-link"
                title="Telegram bot"
              >
                <MessageCircle size={18} />
                <span>Telegram bot</span>
              </Link>
            </div> */}

            <div className="sidebar-section">
              <button
                className="sidebar-link logout-link"
                onClick={handleLogout}
                title="Chiqish"
              >
                <LogOut size={18} />
                <span>Chiqish</span>
              </button>
            </div>
          </div>

          <div className="user-layout__content">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
