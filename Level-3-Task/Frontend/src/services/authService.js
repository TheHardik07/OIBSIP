import api from "./api";

export const register = (userData) => api.post("/auth/register", userData);
export const login = (credentials) => api.post("/auth/login", credentials);
export const verifyEmail = (token) => api.get(`/auth/verify-email/${token}`);
export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });
export const resetPassword = (token, password) =>
  api.post(`/auth/reset-password/${token}`, { password });
