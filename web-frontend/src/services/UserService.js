import api from "./api";

const API_BASE = "/users";

const getUserProfile = async () => {
  const response = await api.get(`${API_BASE}/profile`);
  return response.data;
};

const updateUserProfile = async (userData) => {
  const response = await api.put(`${API_BASE}/profile`, userData);
  return response.data;
};

const getTransactionHistory = async (params) => {
  const response = await api.get(`${API_BASE}/transactions`, { params });
  return response.data;
};

const UserService = {
  getUserProfile,
  updateUserProfile,
  getTransactionHistory,
};

export default UserService;
