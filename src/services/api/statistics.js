// Statistika ma'lumotlarini olish
export const fetchStatistics = async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://api.sahifam.uz";

  try {
    const [jobsRes, orgsRes, usersRes] = await Promise.all([
      fetch(`${baseUrl}/jobs`),
      fetch(`${baseUrl}/organizations`),
      fetch(`${baseUrl}/users`),
    ]);

    const [jobsData, orgsData, usersData] = await Promise.all([
      jobsRes.json().catch(() => ({})),
      orgsRes.json().catch(() => ({})),
      usersRes.json().catch(() => ({})),
    ]);

    // API javoblarini tekshirish va to'g'ri ma'lumotlarni olish
    const jobsCount = extractCount(jobsData, "jobs");
    const orgsCount = extractCount(orgsData, "organizations");
    const usersCount = extractCount(usersData, "users");

    const result = {
      jobsCount,
      organizationsCount: orgsCount,
      usersCount,
    };

    return result;
  } catch (error) {
    return {
      jobsCount: 0,
      organizationsCount: 0,
      usersCount: 0,
    };
  }
};

// Helper function to extract count from different API response formats
const extractCount = (data, type) => {
  // Specific check for the actual API structure: data.data.organizations
  if (
    type === "organizations" &&
    data?.data?.organizations &&
    Array.isArray(data.data.organizations)
  ) {
    return data.data.organizations.length;
  }

  // Specific check for jobs: data.data.jobs
  if (type === "jobs" && data?.data?.jobs && Array.isArray(data.data.jobs)) {
    return data.data.jobs.length;
  }

  // Specific check for users: data.data.users
  if (type === "users" && data?.data?.users && Array.isArray(data.data.users)) {
    return data.data.users.length;
  }

  // Generic checks for nested data structures
  if (data?.data?.[type] && Array.isArray(data.data[type])) {
    return data.data[type].length;
  }

  // Try different possible structures
  if (data?.data?.meta?.totalCount) {
    return data.data.meta.totalCount;
  }

  if (data?.meta?.totalCount) {
    return data.meta.totalCount;
  }

  if (data?.data?.length) {
    return data.data.length;
  }

  if (Array.isArray(data?.data)) {
    return data.data.length;
  }

  if (Array.isArray(data)) {
    return data.length;
  }

  if (data?.count) {
    return data.count;
  }

  if (data?.total) {
    return data.total;
  }

  return 0;
};
