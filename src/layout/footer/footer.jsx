import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";
import telegram from "../../assets/telegram.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <img src={logo} alt="Jobs HR logo" />
        </div>

        <div className="footer__links">
          <p>Jobs HR</p>
          <Link to="/">Bosh sahifa</Link>
          <Link to="/about">Biz haqimizda</Link>
          <Link to="/jobs">Bo'sh ish o'rinlari</Link>
          <Link to="/companies">Tashkilotlar</Link>
        </div>

        <div className="footer__socials">
          <p>Bizning ijtimoiy tarmoqlar:</p>
          <div className="footer__icons">
            <a
              href="https://t.me/HR_JOBS_UZB"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={telegram} alt="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
