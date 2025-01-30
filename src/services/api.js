import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";
const API_AUTH_URL = `${API_BASE_URL}/auth`;
const API_USER_URL = `${API_BASE_URL}/user`;

const api = axios.create({
  baseURL: API_AUTH_URL,
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

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export { API_AUTH_URL, API_USER_URL };
export default api;


