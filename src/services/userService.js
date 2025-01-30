import axios from "axios";
import { API_USER_URL, getAuthHeader, API_AUTH_URL} from "./api";

// Fetch topics and patterns
export const getTopics = () => axios.get(`${API_AUTH_URL}/topics/getAll`);
export const getPatterns = () => axios.get(`${API_AUTH_URL}/patterns/getAll`);


// Progress tracking functions
export const getUserProgress = async (userId) => {
  return axios.get(`${API_USER_URL}/progress/${userId}`, getAuthHeader());
};

export const trackQuestionProgress = async (userId, questionId, completed) => {
  return axios.post(
    `${API_USER_URL}/progress/${userId}/toggle?questionId=${questionId}&completed=${completed}`,
    null,
    getAuthHeader()
  );
};

// Fetch user details
export async function getUserDetails() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(`${API_USER_URL}/details`, {
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

