import "./home.scss";
import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";
import logoP from "../../assets/logo-p.png";
import { useScrollTop } from "../../hooks/useScrollTop";
import FeaturedOrganizations from "../../components/featured-organizations/featured-organizations";
import { Statistics } from "../../components/statistics/statistics";
import gerb from "../../assets/gerb.png";

export const Home = () => {
  useScrollTop(0);

  return (
    <div className="home">
      <section className="home__hero">
        <div className="container">
          {/* Prokuratura tashabbusi banner */}
          {/* <div className="home__prosecutor-banner">
            <div className="home__prosecutor-content">
              <img
                src={logoP || "/placeholder.svg"}
                alt="Prokuratura gerbi"
                className="home__prosecutor-logo"
              />
              <img
                src={gerb || "/placeholder.svg"}
                alt="Prokuratura gerbi"
                className="home__prosecutor-logo"
              />
              <p className="home__prosecutor-text">
                Ushbu platforma O'zbekiston Respublikasi Andijon viloyati Asaka
                tumani prokuraturasi va Asaka tumani hokimligi tashabbusi bilan
                joriy etildi.
              </p>
            </div>
          </div> */}

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
                mos ish e'lonlarini topishingiz mumkin. Jobs HR 2025-yilda ishga
                tushirilgan bo'lib, qisqa vaqt ichida minglab foydalanuvchilar
                ishonchini qozondi. Bizning maqsadimiz — O'zbekiston bo'ylab
                ishga joylashish jarayonini soddalashtirish va tezlashtirish.
                <br />
                <br />
                {/* Jobs HR nafaqat ish topish imkoniyatini beradi, balki
                tashkilotlar uchun ham qulay boshqaruv tizimini taklif etadi.
                E'lonlarni qo'shish, nomzodlarni saralash va aloqa o'rnatish
                jarayonlari ilg'or texnologiyalar orqali yengillashtirilgan. */}
              </p>
            </div>

            <div className="home__about__videos">
              <div className="home__about__video">
                <a
                  href="https://youtu.be/k03c5PNQPZA?si=MYK9TyyMki02Ka02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-placeholder"
                >
                  <div className="video-thumbnail">
                    {/* <img
                      src="/placeholder.svg?height=315&width=560"
                      // alt="Video thumbnail 1"
                      className="thumbnail-image"
                    /> */}
                    <div className="play-button">
                      <svg width="68" height="48" viewBox="0 0 68 48">
                        <path
                          d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                          fill="#f00"
                        ></path>
                        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="video-info">
                    <h4>Kirish</h4>
                    <p>Platformamiz imkoniyatlari haqida batafsil</p>
                  </div>
                </a>
              </div>

              <div className="home__about__video">
                <a
                  href="https://youtu.be/HIXE1PC80IM?si=LRWlsFJaswMiTqd2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-placeholder"
                >
                  <div className="video-thumbnail">
                    {/* <img
                      src="/placeholder.svg?height=315&width=560"
                      alt="Video thumbnail 2"
                      className="thumbnail-image"
                    /> */}
                    <div className="play-button">
                      <svg width="68" height="48" viewBox="0 0 68 48">
                        <path
                          d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                          fill="#f00"
                        ></path>
                        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="video-info">
                    <h4>Ariza topshirish</h4>
                    <p>Ro'xatdan o'rish va ariza topshirish haqida</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faol tashkilotlar komponenti */}
      <FeaturedOrganizations />
    </div>
  );
};
