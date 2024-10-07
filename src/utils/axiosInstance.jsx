import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});
axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);
export default axiosInstance;
