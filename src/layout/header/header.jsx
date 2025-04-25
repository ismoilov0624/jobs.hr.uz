import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    <>
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
                <Link to="/" className="header__link">
                  {t("home")}
                </Link>
                <Link to="/about" className="header__link">
                  {t("about")}
                </Link>
                <Link to="/jobs" className="header__link">
                  {t("vacancies")}
                </Link>
                <Link to="/companies" className="header__link">
                  {t("companies")}
                </Link>
                <a
                  href="https://t.me/HR_JOBS_UZB"
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
                <Link to="/signup" className="burger__link">
                  {t("signup")}
                </Link>
                <Link to="/login" className="burger__link">
                  {t("login")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
