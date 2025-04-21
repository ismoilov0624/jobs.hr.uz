import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import logo from "../../assets/logo.png";
import BurgerMenu from "./components/burger-menu/burger-menu";
import prof from "../../assets/prof.webp";

export const Header = () => {
  return (
    <>
      <header className="header">
        <BurgerMenu />
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <div className="header__logo">
                <img className="nav__logo" src={logo} alt="Logo" />
              </div>
              <nav className="header__nav">
                <Link to="/" className="header__link">
                  Bosh sahifa
                </Link>
                <Link to="/about" className="header__link">
                  Biz haqimizda
                </Link>
                <Link to="/jobs" className="header__link">
                  Bo'sh ish o'rinlari
                </Link>
                <Link to="/companies" className="header__link">
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
              </nav>
            </div>

            <div className="header__right">
              <div className="header__lang">O'z</div>
              <Link to="/profile" className="header__profile">
                <img src={prof} alt="" />
              </Link>
              <div className="header__auth">
                <Link to="/signup" className="burger__link">
                  Ro'yxatdan o'tish
                </Link>
                <Link to="/login" className="burger__link">
                  Kirish
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
