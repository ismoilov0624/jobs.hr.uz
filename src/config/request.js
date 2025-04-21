import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({ baseURL: "http://192.168.96.165:4000" });

request.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${Cookies.get("user_token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export { request };
