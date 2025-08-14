import axios from "axios";

const token = localStorage.getItem("token");
const apiUrl = import.meta.env.VITE_API_URL;
const api = () =>
  axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

export default api;
