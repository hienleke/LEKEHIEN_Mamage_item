// src/services/api.js
import axios from "axios";

const api = axios.create({
     baseURL: "http://localhost:3001/api", // Replace with your backend API URL
});

export default api;
