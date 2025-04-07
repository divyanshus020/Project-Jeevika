import axios from "axios";

// Base API Setup
const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Attach Token to Every Request
API.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ✅ Authentication APIs
export const resetPassword = (token, data) => 
  API.post(`/auth/reset-password/${token}`, data);

export const forgetPassword = (data) => 
  API.post("/auth/forget-password", data);

export const changePassword = (data) => 
  API.post("/auth/change-password", data);

// ✅ Company APIs
export const registerCompany = (userData) =>
  API.post("/register/company", userData);

export const signInCompany = (userData) =>
  API.post("/signin/company", userData);

export const updateCompany = (id, userData) =>
  API.patch(`/company/${id}`, userData);

export const getCompanyById = (id) =>
  API.get(`/company/${id}`);

export const getAllCompanies = () =>
  API.get("/companies");

// ✅ Employee APIs
export const registerEmployee = (userData) =>
  API.post("/register/employee", userData);

export const signInEmployee = (userData) =>
  API.post("/signin/employee", userData);

export const updateEmployee = (id, userData) =>
  API.patch(`/employee/${id}`, userData);

export const getEmployeeById = (id) =>
  API.get(`/employee/${id}`);

export const getAllEmployees = () =>
  API.get("/employees");

// ✅ Team Member APIs
export const registerTeamMember = (userData) =>
  API.post("/register/teammember", userData);

export const signInTeamMember = (userData) =>
  API.post("/signin/teammember", userData); 

export const updateTeamMember = (id, userData) =>
  API.patch(`/teammember/${id}`, userData);

// ✅ Message APIs  
export const sendMessage = (messageData) => 
  API.post("/messages", messageData);

export const getMessages = () => 
  API.get("/messages");

export const getMessageById = (id) => 
  API.get(`/messages/${id}`);

export const deleteMessage = (id) => 
  API.delete(`/messages/${id}`);
