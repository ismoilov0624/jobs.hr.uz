import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import logo from "../../assets/logo.png";
import BurgerMenu from "./components/burger-menu/burger-menu";

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
              </nav>
            </div>

            <div className="header__right">
              <div className="header__lang">O'zbekcha</div>
              <div className="header__profile"></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
