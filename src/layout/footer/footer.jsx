import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import telegram from "../../assets/telegram.svg";
import facebook from "../../assets/facebook.svg";
import qrcode from "../../assets/qrcode.png";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/">
          <div className="header__logo">
            <img className="nav__logo" src={logo} alt="Logo" />
          </div>
        </Link>

        <div className="footer__links">
          <p>Jobs HR</p>
          <Link to="/">Bosh sahifa</Link>
          <Link to="/about">Biz haqimizda</Link>
          <Link to="/jobs">Bo'sh ish o'rinlari</Link>
          <Link to="/companies">Tashkilotlar</Link>
        </div>

        <div className="footer__contact">
          <p>Kontaktlar</p>
          <div className="footer__contactItem">
            <span className="footer__contactTitle">
              Aloqa va hamkorlik uchun:
            </span>
          </div>
          <div className="footer__contactItem">
            <span>info@jobshr.uz</span>
          </div>
          <div className="footer__contactItem">
            <span>+998 90 445 80 80</span>
          </div>
          <div className="footer__contactItem">
            <span>Andijon, Uzbekistan</span>
          </div>
        </div>

        <div className="footer__socials">
          <p>Bizning ijtimoiy tarmoqlar:</p>
          <div className="footer__icons">
            <a
              href="https://t.me/jobs_hr_uz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={telegram} alt="Telegram" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61575490258963"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="Facebook" />
            </a>
            <div className="footer__qrcode">
              <img src={qrcode} alt="QR code" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
