import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import "./burger-menu.scss";
import { useTranslation } from "react-i18next";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Menu right isOpen={isOpen} onStateChange={handleStateChange}>
      <Link onClick={closeMenu} className="menu-item" to="/">
        {t("home")}
      </Link>
      <Link onClick={closeMenu} className="menu-item" to="/about">
        {t("about")}
      </Link>
      <Link onClick={closeMenu} className="menu-item" to="/jobs">
        {t("vacancies")}
      </Link>
      <Link onClick={closeMenu} className="menu-item" to="/companies">
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

      <div className="menu-auth">
        <Link onClick={closeMenu} className="burger-link" to="/signup">
          {t("signup")}
        </Link>
        <Link onClick={closeMenu} className="burger-link" to="/login">
          {t("login")}
        </Link>
      </div>
    </Menu>
  );
};

export default BurgerMenu;
