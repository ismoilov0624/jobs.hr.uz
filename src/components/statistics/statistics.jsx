import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchStatistics } from "../../services/api/statistics";
import { fetchJobs } from "../../services/api/jobs";
import { Building, Briefcase, Users } from "lucide-react";
import "./statistics.scss";

// Function to fetch users count
const fetchUsersCount = async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://api.sahifam.uz";
  try {
    const response = await fetch(`${baseUrl}/users?limit=50000`);
    const data = await response.json();

    // Try different possible response structures
    if (data?.data?.users && Array.isArray(data.data.users)) {
      return data.data.users.length;
    }
    if (data?.data && Array.isArray(data.data)) {
      return data.data.length;
    }
    if (data?.users && Array.isArray(data.users)) {
      return data.users.length;
    }
    if (Array.isArray(data)) {
      return data.length;
    }
    if (data?.total) {
      return data.total;
    }
    if (data?.count) {
      return data.count;
    }
    return 0;
  } catch (error) {
    console.error("Error fetching users count:", error);
    return 0;
  }
};

export const Statistics = () => {
  const { data: statistics, isLoading: isStatsLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: fetchStatistics,
    refetchInterval: 30000,
    staleTime: 0,
    cacheTime: 0,
  });

  // Fetch actual jobs count
  const { data: jobsData, isLoading: isJobsLoading } = useQuery({
    queryKey: ["jobs-count"],
    queryFn: () => fetchJobs({ limit: 1000 }),
    refetchInterval: 30000,
    staleTime: 0,
    cacheTime: 0,
  });

  // Fetch actual users count
  const { data: usersCount, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users-count"],
    queryFn: fetchUsersCount,
    refetchInterval: 30000,
    staleTime: 0,
    cacheTime: 0,
  });

  const isLoading = isStatsLoading || isJobsLoading || isUsersLoading;

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

  // Get actual jobs count from the fetched data
  let actualJobsCount = 0;
  if (jobsData) {
    if (jobsData.data && Array.isArray(jobsData.data.jobs)) {
      actualJobsCount = jobsData.data.jobs.length;
    } else if (jobsData.data && Array.isArray(jobsData.data)) {
      actualJobsCount = jobsData.data.length;
    } else if (Array.isArray(jobsData.jobs)) {
      actualJobsCount = jobsData.jobs.length;
    } else if (Array.isArray(jobsData)) {
      actualJobsCount = jobsData.length;
    }
  }

  const stats = [
    {
      icon: <Building size={32} />,
      number: statistics?.organizationsCount || 0,
      label: "Tashkilotlar",
      color: "blue",
      link: "/companies",
    },
    {
      icon: <Briefcase size={32} />,
      number: actualJobsCount,
      label: "Bo'sh ish o'rinlari",
      color: "green",
      link: "/jobs",
    },
    {
      icon: <Users size={32} />,
      number: usersCount || 0,
      label: "Foydalanuvchilar",
      color: "orange",
      link: null,
    },
  ];

  return (
    <div className="statistics">
      <div className="container">
        <div className="statistics__grid">
          {stats.map((stat, index) => {
            const StatItem = (
              <div
                key={index}
                className={`statistics__item ${stat.color} ${
                  stat.link ? "clickable" : ""
                }`}
              >
                <div className="statistics__icon">{stat.icon}</div>
                <div className="statistics__content">
                  <div className="statistics__number">
                    {stat.number.toLocaleString()}
                  </div>
                  <div className="statistics__label">{stat.label}</div>
                </div>
              </div>
            );

            return stat.link ? (
              <Link key={index} to={stat.link} className="statistics__link">
                {StatItem}
              </Link>
            ) : (
              StatItem
            );
          })}
        </div>
      </div>
    </div>
  );
};
