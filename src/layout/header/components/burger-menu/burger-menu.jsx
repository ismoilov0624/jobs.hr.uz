import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import "./burger-menu.scss";
import { useTranslation } from "react-i18next";

const BurgerMenu = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const { t } = useTranslation();

  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Menu right isOpen={isOpen} onStateChange={handleStateChange}>
      <Link onClick={closeMenu} className="menu-item" to="/">
        Bosh sahifa
      </Link>
      <Link onClick={closeMenu} className="menu-item" to="/about">
        Biz haqimizda
      </Link>
      <Link onClick={closeMenu} className="menu-item" to="/jobs">
        Bo'sh ish o'rinlari
      </Link>
      <Link onClick={closeMenu} className="menu-item" to="/companies">
        Tashkilotlar
      </Link>

      <a
        href="https://t.me/HR_JOBS_UZB"
        target="_blank"
        rel="noopener noreferrer"
        className="header__link"
      >
        Telegram kanal
      </a>

      <div className="menu-auth">
        {isLoggedIn ? (
          <Link onClick={closeMenu} className="burger-link" to="/profile">
            Mening profilim
          </Link>
        ) : (
          <>
            <Link onClick={closeMenu} className="burger-link" to="/signup">
              Ro'yxatdan o'tish
            </Link>
            <Link onClick={closeMenu} className="burger-link" to="/login">
              Kirish
            </Link>
          </>
        )}
      </div>
    </Menu>
  );
};

export default BurgerMenu;
