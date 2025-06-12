// Statistika ma'lumotlarini olish
export const fetchStatistics = async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://api.sahifam.uz";

  try {
    console.log("📊 Fetching statistics from:", baseUrl);

    const [jobsRes, orgsRes, usersRes] = await Promise.all([
      fetch(`${baseUrl}/jobs`),
      fetch(`${baseUrl}/organizations`),
      fetch(`${baseUrl}/users`),
    ]);

    console.log("📊 API responses status:", {
      jobs: jobsRes.status,
      orgs: orgsRes.status,
      users: usersRes.status,
    });

    const [jobsData, orgsData, usersData] = await Promise.all([
      jobsRes.json().catch(() => ({})),
      orgsRes.json().catch(() => ({})),
      usersRes.json().catch(() => ({})),
    ]);

    console.log("📊 Raw API data:", {
      jobs: jobsData,
      orgs: orgsData,
      users: usersData,
    });

    // API javoblarini tekshirish va to'g'ri ma'lumotlarni olish
    const jobsCount = extractCount(jobsData, "jobs");
    const orgsCount = extractCount(orgsData, "organizations");
    const usersCount = extractCount(usersData, "users");

    const result = {
      jobsCount,
      organizationsCount: orgsCount,
      usersCount,
    };

    console.log("📊 Final statistics result:", result);
    return result;
  } catch (error) {
    console.error("❌ Error fetching statistics:", error);
    return {
      jobsCount: 0,
      organizationsCount: 0,
      usersCount: 0,
    };
  }
};

// Helper function to extract count from different API response formats
const extractCount = (data, type) => {
  console.log(`📊 Extracting count for ${type}:`, data);

  // Specific check for the actual API structure: data.data.organizations
  if (
    type === "organizations" &&
    data?.data?.organizations &&
    Array.isArray(data.data.organizations)
  ) {
    console.log(
      `✅ Found data.data.organizations array for ${type}:`,
      data.data.organizations.length
    );
    return data.data.organizations.length;
  }

  // Specific check for jobs: data.data.jobs
  if (type === "jobs" && data?.data?.jobs && Array.isArray(data.data.jobs)) {
    console.log(
      `✅ Found data.data.jobs array for ${type}:`,
      data.data.jobs.length
    );
    return data.data.jobs.length;
  }

  // Specific check for users: data.data.users
  if (type === "users" && data?.data?.users && Array.isArray(data.data.users)) {
    console.log(
      `✅ Found data.data.users array for ${type}:`,
      data.data.users.length
    );
    return data.data.users.length;
  }

  // Generic checks for nested data structures
  if (data?.data?.[type] && Array.isArray(data.data[type])) {
    console.log(
      `✅ Found data.data.${type} array for ${type}:`,
      data.data[type].length
    );
    return data.data[type].length;
  }

  // Try different possible structures
  if (data?.data?.meta?.totalCount) {
    console.log(`✅ Found totalCount for ${type}:`, data.data.meta.totalCount);
    return data.data.meta.totalCount;
  }

  if (data?.meta?.totalCount) {
    console.log(`✅ Found meta.totalCount for ${type}:`, data.meta.totalCount);
    return data.meta.totalCount;
  }

  if (data?.data?.length) {
    console.log(`✅ Found data.length for ${type}:`, data.data.length);
    return data.data.length;
  }

  if (Array.isArray(data?.data)) {
    console.log(`✅ Found array data for ${type}:`, data.data.length);
    return data.data.length;
  }

  if (Array.isArray(data)) {
    console.log(`✅ Found direct array for ${type}:`, data.length);
    return data.length;
  }

  if (data?.count) {
    console.log(`✅ Found count for ${type}:`, data.count);
    return data.count;
  }

  if (data?.total) {
    console.log(`✅ Found total for ${type}:`, data.total);
    return data.total;
  }

  console.log(`⚠️ No count found for ${type}, returning 0`);
  return 0;
};
