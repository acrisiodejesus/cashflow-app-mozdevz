import axios from "axios"

const token = localStorage.getItem("token");
const api = () => axios.create({
    baseURL: "http://127.0.0.1:5000/api",
    headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
    }
});

export default api;