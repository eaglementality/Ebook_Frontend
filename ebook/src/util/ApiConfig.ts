import axios from "axios";

const api = axios.create({
  baseURL: "https://ebook-dbm9.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const userObject = localStorage.getItem("user");
  let token = JSON.parse(userObject as string)?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;