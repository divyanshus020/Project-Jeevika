import axios from "axios";

// ✅ Base API Setup
const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ✅ Attach Token to Every Request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// =========================================
// ✅ AUTHENTICATION APIs (REGISTER & LOGIN)
// =========================================

// 🔹 Employee Register
export const registerEmployee = (userData) =>
  API.post("/auth/register/employee", userData);

// 🔹 Company Register
export const registerCompany = (userData) =>
  API.post("/auth/register/company", userData);

// 🔹 Team Register
export const registerTeam = (userData) =>
  API.post("/auth/register/team", userData);

// 🔹 Common Login API for All Roles
export const loginUser = (userData) =>
  API.post("/auth/login", userData);

// =========================================
// ✅ PROFILE APIs (GET & UPDATE)
// =========================================

// 🔹 Get Employee Profile
export const getEmployeeProfile = () =>
  API.get("/auth/profile/employee");

// 🔹 Get Company Profile
export const getCompanyProfile = () =>
  API.get("/auth/profile/company");

// 🔹 Get Team Profile
export const getTeamProfile = () =>
  API.get("/auth/profile/team");

// 🔹 Update Employee Profile
export const updateEmployeeProfile = (userData) =>
  API.put("/employee/profile", userData);

// 🔹 Update Company Profile
export const updateCompanyProfile = (userData) =>
  API.put("/company/profile", userData);

// 🔹 Update Team Profile
export const updateTeamProfile = (userData) =>
  API.put("/team/profile", userData);

// =========================================
// ✅ DASHBOARD APIs (IF NEEDED)
// =========================================

// 🔹 Fetch Dashboard Data Based on Role
export const getDashboardData = (role) =>
  API.get(`/dashboard/${role}`);

