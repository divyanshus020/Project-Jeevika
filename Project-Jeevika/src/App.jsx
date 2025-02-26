import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import NavBar from "./components/NavBar";
import Home from "../src/pages/Home"
// import AuthPage from "./pages/AuthPage";
import Employee from "./pages/Employee";
import Hire from "./pages/Hire";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/LoginPage";
import WorkerProfilePage from "./components/WorkerProfilePage";
import CompanyProfilePage from "./components/CompanyProfilePage";

function App() {
  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Employee" element={<Employee />} />
        <Route path="/Hire" element={<Hire />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/worker-profile" element={<WorkerProfilePage />} />
        <Route path="/company-profile" element={<CompanyProfilePage />} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
