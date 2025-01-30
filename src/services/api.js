import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";
const API_PROGRESS_URL = "http://localhost:8080/api/user/progress";

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

// Progress tracking functions
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUserProgress = async (userId) => {
  return axios.get(`${API_PROGRESS_URL}/${userId}`, getAuthHeader());
};

export const trackQuestionProgress = async (userId, questionId, completed) => {
  return axios.post(
    `${API_PROGRESS_URL}/${userId}/toggle?questionId=${questionId}&completed=${completed}`,
    null,
    getAuthHeader()
  );
};


export async function getUserDetails() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch("http://localhost:8080/api/user/details", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }

  return response.json(); // Return JSON response
}


export default api;

