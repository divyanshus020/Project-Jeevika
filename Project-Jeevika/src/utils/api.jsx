import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// API functions
export const submitWorkerProfile = (userData) => API.post("/employeedataform", userData);
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);
export const getProfile = () => API.get("/auth/profile");
