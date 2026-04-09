import api from "./api";

const API_BASE = "/users";

const login = async (username, password) => {
  const response = await api.post(`${API_BASE}/login`, { username, password });
  if (response.data && response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (usernameOrData, email, password, extraData = {}) => {
  let payload;
  if (typeof usernameOrData === "object" && usernameOrData !== null) {
    payload = usernameOrData;
  } else {
    payload = { username: usernameOrData, email, password, ...extraData };
  }
  const response = await api.post(`${API_BASE}/register`, payload);
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const isAuthenticated = () => {
  return (
    localStorage.getItem("isAuthenticated") === "true" &&
    !!localStorage.getItem("token")
  );
};

const AuthService = {
  login,
  register,
  logout,
  getCurrentUser,
  isAuthenticated,
};

export default AuthService;
