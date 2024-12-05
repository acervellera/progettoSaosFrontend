import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081", // URL base per le API
  timeout: 5000, // Timeout opzionale
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
