import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5057/api",
});
export default API;