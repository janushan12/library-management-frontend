import axios from "axios";
import { config } from "process";

const API = axios.create({
    baseURL: "http://localhost:5057/api",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;