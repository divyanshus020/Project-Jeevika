import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../src/components/Navbar";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Hire from "./pages/Hire";
// import Team from "./pages/Team";
// import Employee from "./pages/Employee";
import AllForm from './pages/AllForm'


const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Employee" element={<Employee />} />
        <Route path="/Hire" element={<Hire />} />
        {/* <Route path="/Team" element={<AllForm />} /> */}
        <Route path="/AllForm" element={<AllForm />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
