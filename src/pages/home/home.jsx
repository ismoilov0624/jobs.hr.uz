import "./home.scss";
import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";
import { useScrollTop } from "../../hooks/useScrollTop";
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
              <img src={hero} alt="Jobs illustration" />
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
                mos ish e'lonlarini topishingiz mumkin.
              </p>
            </div>

            <div className="home__about__videos">
              <div className="video-card">
                <div className="video-wrapper">
                  <iframe
                    src="https://www.youtube.com/embed/yRj3EBGOMUo?si=Sc2-xmzCzt_SYA1l"
                    title="Platformada tez va oson ro'yxatdan o'tish"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h4>Platformada tez va oson ro'yxatdan o'tish</h4>
              </div>

              <div className="video-card">
                <div className="video-wrapper">
                  <iframe
                    src="https://www.youtube.com/embed/RWq35zSnL4o?si=fn5bDgjGdvqRlo8n"
                    title="Profilni to‘ldirish va ariza yuborish"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h4>Profilni to‘ldirish va ariza yuborish</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedOrganizations />
    </div>
  );
};
