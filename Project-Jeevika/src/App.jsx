import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import NavBar from "./components/NavBar";
import Home from "../src/pages/Home";
import Employee from "./pages/Employee";
import Hire from "./pages/Hire";
import EmployeeDashboard from "./pages/EmployeeDashbord";
import Login from "./pages/LoginPage";
import EmployeeDataForm from "./pages/EmployeeRegister";
import CompanyDashboard from "./pages/CompanyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import RegisterEmployee from "./pages/EmployeeRegister";
import RegisterCompany from "./pages/CompanyRegsiter";
// import EmployeeCard from "./pages/EmployeeCard";

// Component to Handle Layout
const Layout = ({ children }) => {
  const location = useLocation();

  // Hide NavBar on EmployeeDashboard and CompanyDashboard
  const hideNavBar = ["/EmployeeDashboard", "/CompanyDashboard"].includes(location.pathname);

  return (
    <>
      {!hideNavBar && <NavBar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Employee" element={<Employee />} />
          <Route path="/Hire" element={<Hire />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register/employee" element={<EmployeeDataForm />} />
          <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
          <Route path="/CompanyDashboard" element={<CompanyDashboard />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/register/employee" element={<RegisterEmployee />} />
          <Route path="/register/company" element={<RegisterCompany />} />
          {/* <Route path="company/employee-card" element={<EmployeeCard />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
