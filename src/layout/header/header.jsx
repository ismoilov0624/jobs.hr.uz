import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./header.scss";
import logo from "../../assets/logo.png";
import BurgerMenu from "./components/burger-menu/burger-menu";
import prof from "../../assets/prof.webp";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const currentLang = i18n.language.toUpperCase();

  return (
    <header className="header">
      <BurgerMenu />
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/">
              <div className="header__logo">
                <img className="nav__logo" src={logo} alt="Logo" />
              </div>
            </Link>
            <nav className="header__nav">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `header__link ${isActive ? "active" : ""}`
                }
              >
                {t("home")}
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `header__link ${isActive ? "active" : ""}`
                }
              >
                {t("about")}
              </NavLink>
              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  `header__link ${isActive ? "active" : ""}`
                }
              >
                {t("vacancies")}
              </NavLink>
              <NavLink
                to="/companies"
                className={({ isActive }) =>
                  `header__link ${isActive ? "active" : ""}`
                }
              >
                {t("companies")}
              </NavLink>
              <a
                href="https://t.me/jobs_hr_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="header__link"
              >
                {t("telegram_channel")}
              </a>
            </nav>
          </div>

          <div className="header__right">
            <div className="header__lang-dropdown">
              <button onClick={() => setIsOpen(!isOpen)}>
                {currentLang} ▼
              </button>
              {isOpen && (
                <ul className="lang__menu">
                  <li onClick={() => changeLanguage("uz")}>O'zbekcha</li>
                  <li onClick={() => changeLanguage("ru")}>Русский</li>
                  <li onClick={() => changeLanguage("en")}>English</li>
                </ul>
              )}
            </div>
            <Link to="/profile" className="header__profile">
              <img src={prof} alt="Profile" />
            </Link>
            <div className="header__auth">
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `burger__link ${isActive ? "active" : ""}`
                }
              >
                {t("signup")}
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `burger__link ${isActive ? "active" : ""}`
                }
              >
                {t("login")}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
