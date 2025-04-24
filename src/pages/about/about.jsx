import React from "react";
import "./about.scss";
import home_about from "../../assets/home_about.jpg";
import CountUp from "react-countup";
import { useScrollTop } from "../../hooks/useScrollTop";

export const About = () => {
  useScrollTop(0);
  return (
    <>
      <div className="home__about">
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
                mos ish e'lonlarini topishingiz mumkin. Jobs HR 2025-yilda ishga
                tushirilgan bo‘lib, qisqa vaqt ichida minglab foydalanuvchilar
                ishonchini qozondi. Bizning maqsadimiz — O‘zbekiston bo‘ylab
                ishga joylashish jarayonini soddalashtirish va tezlashtirish.
                <br />
                <br />
                Jobs HR nafaqat ish topish imkoniyatini beradi, balki
                tashkilotlar uchun ham qulay boshqaruv tizimini taklif etadi.
                E'lonlarni qo‘shish, nomzodlarni saralash va aloqa o‘rnatish
                jarayonlari ilg‘or texnologiyalar orqali yengillashtirilgan.
                <br />
              </p>
            </div>
            <div className="home__about__img">
              <img src={home_about} alt="Jobs HR haqida" />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="home__stats">
          <div className="home__stat-box">
            <h2>
              <CountUp end={4} duration={2} />
            </h2>
            <p>Bo'sh ish o'rinlari</p>
          </div>
          <div className="home__stat-box">
            <h2>
              <CountUp end={6} duration={2} />
            </h2>
            <p>Tashkilotlar</p>
          </div>
          <div className="home__stat-box">
            <h2>
              <CountUp end={39934} duration={2.5} separator=" " />
            </h2>
            <p>Nomzodlar</p>
          </div>
          <div className="home__stat-box">
            <h2>
              <CountUp end={131} duration={2} />
            </h2>
            <p>Barcha ish joylari</p>
          </div>
        </div>
      </div>
    </>
  );
};
