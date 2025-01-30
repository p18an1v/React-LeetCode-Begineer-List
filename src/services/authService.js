import api, { API_AUTH_URL } from "./api";

// Authentication APIs
export const login = (email, password) => api.post(`${API_AUTH_URL}/login`, { email, password });
export const register = (email, password) => api.post(`${API_AUTH_URL}/register`, { email, password });
export const forgotPassword = (email) => api.post(`${API_AUTH_URL}/forgot-password`, { email });
export const resetPassword = (token, newPassword) => api.post(`${API_AUTH_URL}/reset-password`, { token, newPassword });
// export const getTopics = () => axios.get(`${API_AUTH_URL}/topics/getAll`);
// export const getPatterns = () => axios.get(`${API_USER_URL}/patterns/getAll`);