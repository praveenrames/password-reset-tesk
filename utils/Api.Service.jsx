import axios from "axios";

const AxiosService = axios.create({
  baseURL: "https://password-reset-task-back-end-1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosService.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default AxiosService;
