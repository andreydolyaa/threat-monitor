import axios from "axios";
import { BASE_URL } from "./base";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = JSON.parse(
    //   localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_NAME)
    // );
    const token = "";

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
