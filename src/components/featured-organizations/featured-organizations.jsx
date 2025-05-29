import { Link } from "react-router-dom";
import { useFeaturedOrganizations } from "../../hooks/useOrganizations";
import "./featured-organizations.scss";
import comp from "../../assets/comp.svg";

const FeaturedOrganizations = () => {
  const {
    data: organizations = [],
    isLoading,
    error,
  } = useFeaturedOrganizations(3);

  // Avatar URL ni tekshirish va to'g'ri formatda qaytarish
  const getAvatarUrl = (avatar) => {
    if (!avatar || avatar === "rasm") return null;

    // Agar URL to'g'ri formatda bo'lsa
    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
      return avatar;
    }

    return null;
  };

  if (isLoading) {
    return (
      <div className="home__companies">
        <div className="container">
          <div className="home__companies__wrapper">
            <div className="home__companies__header">
              <p>Faol tashkilotlar</p>
              <Link to="/companies">Barchasi</Link>
            </div>
            <div className="loading-state">Tashkilotlar yuklanmoqda...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home__companies">
        <div className="container">
          <div className="home__companies__wrapper">
            <div className="home__companies__header">
              <p>Faol tashkilotlar</p>
              <Link to="/companies">Barchasi</Link>
            </div>
            <div className="error-state">Xatolik yuz berdi</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="home__companies">
      <div className="container">
        <div className="home__companies__wrapper">
          <div className="home__companies__header">
            <p>Faol tashkilotlar</p>
            <Link to="/companies">Barchasi</Link>
          </div>

          <div className="home__companies__list">
            {organizations.map((organization) => {
              const avatarUrl = getAvatarUrl(organization.avatar);

              return (
                <div className="home__companies__item" key={organization.id}>
                  <div className="home__companies__item__wrapper">
                    <div className="organization-logo">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl || "/placeholder.svg"}
                          alt={`${organization.title} logo`}
                          className="organization-avatar"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                      ) : null}
                      <img
                        src={comp || "/placeholder.svg"}
                        alt="Default organization icon"
                        className="default-icon"
                        style={{ display: avatarUrl ? "none" : "block" }}
                      />
                    </div>
                    <div className="home__companies__item__content">
                      <p className="organization-title">{organization.title}</p>
                      <p className="organization-address">
                        {organization.address}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/jobs?organization=${organization.id}`}
                    className="vacancy-button"
                  >
                    Bo'sh ish o'rinlari
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOrganizations;
