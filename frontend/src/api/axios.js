// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Change this in deployment
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
