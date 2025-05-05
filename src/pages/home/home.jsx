import React, { useEffect, useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import hero1 from "../../assets/hero1.png";
import hero2 from "../../assets/hero2.webp";
import hero3 from "../../assets/hero3.webp";
import home_about from "../../assets/home_about.jpg";
import CountUp from "react-countup";
import { useScrollTop } from "../../hooks/useScrollTop";
import suitcase from "../../assets/suitcase.svg";
import comp from "../../assets/comp.svg";
import worker from "../../assets/worker.svg";
import check from "../../assets/check.svg";

// ! Agar sizda companies array mavjud bo'lmasa, vaqtinchalik uni aniqlab turing
const companies = [
  { name: "Asaka textile", location: "Andijon viloyati, Asaka tumani" },
  { name: "Akfa eshik romlari", location: "Andijon viloyati, Asaka tumani" },
  {
    name: "Asaka davr butlovchi MChJ",
    location: "Andijon viloyati, Asaka tumani",
  },
];

export const Home = () => {
  useScrollTop(0);

  const stats = [
    { count: 4, label: "Bo'sh ish o'rinlari", img: suitcase },
    { count: 6, label: "Tashkilotlar", img: comp },
    { count: 39934, label: "Nomzodlar", img: worker },
    { count: 131, label: "Barcha ish joylari", img: check },
  ];

  const heroImages = [hero1, hero2, hero3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <section className="home__hero">
        <div className="container">
          <div className="home__wrapper">
            <div className="home__text">
              <h1>Jobs HR ish e'lonlari</h1>
              <p>Eng so‘nggi va ishonchli ish e'lonlarini shu yerda toping.</p>
              <div className="home__btn__wrapper">
                <Link className="home__btn" to="/jobs">
                  E'lonlarni ko‘rish
                </Link>
                <a
                  href="https://t.me/jobs_hr_uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home__btn"
                >
                  Telegram kanal
                </a>
              </div>
            </div>
            <div className="home__image">
              <img
                src={heroImages[currentIndex]}
                alt="Hero"
                className={`fade-image ${fade ? "visible" : "hidden"}`}
              />
            </div>
          </div>

          <div className="home__stats">
            {stats.map((item, index) => (
              <div className="home__stat-box" key={index}>
                <img src={item.img} alt="Icon" />
                <div className="home__stat-text">
                  <h2>
                    <CountUp end={item.count} duration={2} />
                  </h2>
                  <p>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home__about">
        <div className="container">
          <div className="home__about__wrapper">
            <div className="home__about__content">
              <h2>Jobs HR haqida</h2>
              <h3>
                Jobs HR — bu ish izlovchilar va ish beruvchilarni samarali
                bog‘lovchi zamonaviy platforma.
              </h3>
              <p>
                Platformamiz orqali siz eng so‘nggi, ishonchli va malakangizga
                mos ish e'lonlarini topishingiz mumkin. Jobs HR 2023-yilda ishga
                tushirilgan bo‘lib, qisqa vaqt ichida minglab foydalanuvchilar
                ishonchini qozondi. Bizning maqsadimiz — O‘zbekiston bo‘ylab
                ishga joylashish jarayonini soddalashtirish va tezlashtirish.
                <br />
                <br />
                Jobs HR nafaqat ish topish imkoniyatini beradi, balki
                tashkilotlar uchun ham qulay boshqaruv tizimini taklif etadi.
                E'lonlarni qo‘shish, nomzodlarni saralash va aloqa o‘rnatish
                jarayonlari ilg‘or texnologiyalar orqali yengillashtirilgan.
              </p>
            </div>
            <div className="home__about__img">
              <img src={home_about} alt="Jobs HR haqida" />
            </div>
          </div>
        </div>
      </section>

      <section className="home__companies">
        <div className="container">
          <div className="home__companies__wrapper">
            <div className="home__companies__header">
              <p>Faol tashkilotlar</p>
              <Link to="/companies">Barchasi</Link>
            </div>

            <div className="home__companies__list">
              {companies.map((company, index) => (
                <div className="home__companies__item" key={index}>
                  <div className="home__companies__item__wrapper">
                    <div className="home__companies__item__content">
                      <p>{company.name}</p>
                      <p>{company.location}</p>
                    </div>
                  </div>
                  <button>Bo'sh ish o'rinlari</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
