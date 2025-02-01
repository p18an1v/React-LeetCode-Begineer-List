import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const API_AUTH_URL = `${API_BASE_URL}/auth`;
const API_USER_URL = `${API_BASE_URL}/user`;
const API_ADMIN_URL = `${API_BASE_URL}/admin`

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

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export { API_AUTH_URL, API_USER_URL, API_ADMIN_URL };
export default api;


