import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import NavBar from "./components/NavBar";
import Home from "../src/pages/Home"
import AuthPage from "./pages/AuthPage";
import Employee from "./pages/Employee";
import Hire from "./pages/Hire";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Employee" element={<Employee />} />
        <Route path="/Hire" element={<Hire />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AuthPage" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
