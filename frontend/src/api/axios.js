// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://dsr-kitchens-backend.onrender.com/api", // Change this in deployment
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
