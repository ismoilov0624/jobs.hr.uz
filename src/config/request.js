import axios from "axios";
import Cookies from "js-cookie";

// Create axios instance
const request = axios.create({
  baseURL: "https://api.sahifam.uz",
  timeout: 10000, // Timeout of 10 seconds
});

// Function to get token from multiple possible sources
const getToken = () => {
  // 1. Check Cookies with key "user_token" (most likely based on previous code)
  const cookieToken = Cookies.get("user_token");
  if (cookieToken) {
    return cookieToken;
  }

  // 2. Check localStorage with various possible keys
  const possibleKeys = [
    "token",
    "user_token",
    "auth_token",
    "accessToken",
    "access_token",
  ];

  for (const key of possibleKeys) {
    const localToken = localStorage.getItem(key);
    if (localToken) {
      console.log(`✅ Token localStorage'dan topildi (${key})`);
      return localToken;
    }
  }

  // 3. Check if user object in localStorage contains token
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user?.token) {
        console.log("✅ Token user object'idan topildi");
        return user.token;
      }
    }
  } catch (error) {}

  return null;
};

// Function to remove token from all possible storage locations
const removeToken = () => {
  console.log("🗑️ Barcha tokenlar o'chirilmoqda...");

  // Remove from cookies
  Cookies.remove("user_token");

  // Remove from localStorage
  const possibleKeys = [
    "token",
    "user_token",
    "auth_token",
    "accessToken",
    "access_token",
  ];
  possibleKeys.forEach((key) => localStorage.removeItem(key));

  // Clear user object if it exists
  localStorage.removeItem("user");
};

// Request interceptor to add auth token
request.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect to login for protected pages, not public ones
      const currentPath = window.location.pathname;
      const publicPaths = [
        "/jobs",
        "/companies",
        "/about",
        "/",
        "/login",
        "/signup",
      ];
      const isPublicPath = publicPaths.some(
        (path) => currentPath === path || currentPath.startsWith(path + "/")
      );

      if (!isPublicPath) {
        removeToken();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export { request };
