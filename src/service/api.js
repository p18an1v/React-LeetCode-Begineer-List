import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

// Axios instance with authentication token
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs
export const login = (email, password) => api.post("/login", { email, password });
export const register = (email, password) => api.post("/register", { email, password });
export const forgotPassword = (email) => api.post("/forgot-password", { email });
export const resetPassword = (token, newPassword) => api.post("/reset-password", { token, newPassword });

// Fetch topics and questions
export const getTopics = () => api.get("/topics/getAll");
export const getPatterns = () => api.get("/patterns/getAll");

export default api;
