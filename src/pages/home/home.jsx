import "./home.scss";
import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";
import home_about from "../../assets/home_about.jpg";
import CountUp from "react-countup";
import { useScrollTop } from "../../hooks/useScrollTop";
import suitcase from "../../assets/suitcase.svg";
import comp from "../../assets/comp.svg";
import worker from "../../assets/worker.svg";
import check from "../../assets/check.svg";
import FeaturedOrganizations from "../../components/featured-organizations/featured-organizations";
import { Statistics } from "../../components/statistics/statistics";

export const Home = () => {
  useScrollTop(0);

  return (
    <div className="home">
      <section className="home__hero">
        <div className="container">
          <div className="home__wrapper">
            <div className="home__text">
              <h1>Jobs HR ish e'lonlari</h1>
              <p>Eng so'nggi va ishonchli ish e'lonlarini shu yerda toping.</p>
              <div className="home__btn__wrapper">
                <Link className="home__btn" to="/jobs">
                  E'lonlarni ko'rish
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
              <img src={hero || "/placeholder.svg"} alt="Jobs illustration" />
            </div>
          </div>

          <Statistics />
        </div>
      </section>

      <section className="home__about">
        <div className="container">
          <div className="home__about__wrapper">
            <div className="home__about__content">
              <h2>Jobs HR haqida</h2>
              <h3>
                Jobs HR — bu ish izlovchilar va ish beruvchilarni samarali
                bog'lovchi zamonaviy platforma.
              </h3>
              <p>
                Platformamiz orqali siz eng so'nggi, ishonchli va malakangizga
                mos ish e'lonlarini topishingiz mumkin. Jobs HR 2023-yilda ishga
                tushirilgan bo'lib, qisqa vaqt ichida minglab foydalanuvchilar
                ishonchini qozondi. Bizning maqsadimiz — O'zbekiston bo'ylab
                ishga joylashish jarayonini soddalashtirish va tezlashtirish.
                <br />
                <br />
                Jobs HR nafaqat ish topish imkoniyatini beradi, balki
                tashkilotlar uchun ham qulay boshqaruv tizimini taklif etadi.
                E'lonlarni qo'shish, nomzodlarni saralash va aloqa o'rnatish
                jarayonlari ilg'or texnologiyalar orqali yengillashtirilgan.
              </p>
            </div>
            <div className="home__about__img">
              <img
                src={home_about || "/placeholder.svg"}
                alt="Jobs HR haqida"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Faol tashkilotlar komponenti */}
      <FeaturedOrganizations />
    </div>
  );
};
