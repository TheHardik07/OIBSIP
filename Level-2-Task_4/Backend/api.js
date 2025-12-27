import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Matches your backend port
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;
