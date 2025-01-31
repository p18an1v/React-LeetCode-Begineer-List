import api, { API_ADMIN_URL } from "./api";

// Topics API
export const createTopic = (data) => api.post(`${API_ADMIN_URL}/topics`, data);
export const updateTopic = (topicId, data) => api.put(`${API_ADMIN_URL}/topics/${topicId}`, data);
export const deleteTopic = (topicId) => api.delete(`${API_ADMIN_URL}/topics/${topicId}`);
export const getTopicById = (topicId) => api.get(`${API_ADMIN_URL}/topics/${topicId}`);

// Topic Questions API
export const addTopicQuestion = (topicId, data) => api.post(`${API_ADMIN_URL}/topics/${topicId}/questions`, data);
export const updateTopicQuestion = (topicId, questionId, data) => api.put(`${API_ADMIN_URL}/topics/${topicId}/questions/${questionId}`, data);
export const deleteTopicQuestion = (topicId, questionId) => api.delete(`${API_ADMIN_URL}/topics/${topicId}/questions/${questionId}`);

// Patterns API
export const createPattern = (data) => api.post(`${API_ADMIN_URL}/patterns`, data);
export const updatePattern = (patternId, data) => api.put(`${API_ADMIN_URL}/patterns/${patternId}`, data);
export const deletePattern = (patternId) => api.delete(`${API_ADMIN_URL}/patterns/${patternId}`);

// Pattern Questions API
export const addPatternQuestion = (patternId, data) => api.post(`${API_ADMIN_URL}/patterns/${patternId}/questions`, data);
export const updatePatternQuestion = (patternId, questionId, data) => api.put(`${API_ADMIN_URL}/patterns/${patternId}/questions/${questionId}`, data);
export const deletePatternQuestion = (patternId, questionId) => api.delete(`${API_ADMIN_URL}/patterns/${patternId}/questions/${questionId}`);

export default {
  createTopic,
  updateTopic,
  deleteTopic,
  getTopicById,
  addTopicQuestion,
  updateTopicQuestion,
  deleteTopicQuestion,
  createPattern,
  updatePattern,
  deletePattern,
  addPatternQuestion,
  updatePatternQuestion,
  deletePatternQuestion,
};