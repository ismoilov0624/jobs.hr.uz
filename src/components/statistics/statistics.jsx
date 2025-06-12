import { useQuery } from "@tanstack/react-query";
import { fetchStatistics } from "../../services/api/statistics";
import { Building, Briefcase, Users } from "lucide-react";
import "./statistics.scss";

export const Statistics = () => {
  const { data: statistics, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: fetchStatistics,
  });

  if (isLoading) {
    return (
      <div className="statistics">
        <div className="container">
          <div className="statistics__grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="statistics__item skeleton">
                <div className="statistics__icon skeleton-icon"></div>
                <div className="statistics__content">
                  <div className="statistics__number skeleton-text"></div>
                  <div className="statistics__label skeleton-text"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: <Building size={32} />,
      number: statistics?.organizationsCount || 0,
      label: "Tashkilotlar",
      color: "blue",
    },
    {
      icon: <Briefcase size={32} />,
      number: statistics?.jobsCount || 0,
      label: "Bo'sh ish o'rinlari",
      color: "green",
    },
    {
      icon: <Users size={32} />,
      number: statistics?.usersCount || 0,
      label: "Foydalanuvchilar",
      color: "orange",
    },
  ];

  return (
    <div className="statistics">
      <div className="container">
        <div className="statistics__grid">
          {stats.map((stat, index) => (
            <div key={index} className={`statistics__item ${stat.color}`}>
              <div className="statistics__icon">{stat.icon}</div>
              <div className="statistics__content">
                <div className="statistics__number">
                  {stat.number.toLocaleString()}
                </div>
                <div className="statistics__label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
