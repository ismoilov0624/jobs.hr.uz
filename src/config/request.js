import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({
  baseURL: "https://sahifam.uz",
});

// Add token only if it exists and endpoint needs it
request.interceptors.request.use(
  (config) => {
    const token = Cookies.get("user_token");
    // token faqat kerakli so‘rovlarda qo‘shiladi
    if (
      token &&
      !["/auth/register", "/auth/verify", "/auth/login"].includes(config.url)
    ) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export { request };
