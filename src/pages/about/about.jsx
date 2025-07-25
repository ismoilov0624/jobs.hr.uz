import React from "react";
import "./about.scss";
import home_about from "../../assets/home_about.jpg";
import CountUp from "react-countup";
import { useScrollTop } from "../../hooks/useScrollTop";
import suitcase from "../../assets/suitcase.svg";
import comp from "../../assets/comp.svg";
import worker from "../../assets/worker.svg";
import check from "../../assets/check.svg";
import { Statistics } from "../../components/statistics/statistics";

export const About = () => {
  useScrollTop(0);

  const stats = [
    { count: 14, label: "Bo'sh ish o'rinlari", img: suitcase },
    { count: 17, label: "Tashkilotlar", img: comp },
    { count: 1420, label: "Nomzodlar", img: worker },
    { count: 24, label: "Barcha ish joylari", img: check },
  ];

  return (
    <>
      <div className="about">
        <div className="container">
          <div className="about__wrapper">
            <div className="about__content">
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
            <div className="about__img">
              <img src={home_about} alt="Jobs HR haqida" />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <Statistics />
      </div>
    </>
  );
};
