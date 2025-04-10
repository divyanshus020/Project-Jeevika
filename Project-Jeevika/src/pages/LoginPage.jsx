import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import CompanyForm from "../components/CompanyForm";
import AdminForm from "../components/AdminForm";
import employeeBgImage from "../assets/Employee.jpg"; // Import employee background
import companyBgImage from "../assets/Company.jpg";   // Import company background
import adminBgImage from "../assets/Admin.jpg";       // Import admin background

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role: paramRole } = useParams();
  const [role, setRole] = useState(paramRole || "employee");

  // Check for redirect param in URL
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirect");

  useEffect(() => {
    if (redirectTo) {
      // Store the redirect URL in sessionStorage or localStorage for persistence
      sessionStorage.setItem("redirectTo", redirectTo); 
    }

    // Redirect based on role if redirectTo is present in storage after component mounts
    const storedRedirect = sessionStorage.getItem("redirectTo");
    if (storedRedirect) {
      navigate(storedRedirect, { replace: true });
      sessionStorage.removeItem("redirectTo"); // Clear after redirect
    }

  }, [redirectTo, navigate, location]);

  // Redirect to default role if role is missing in URL
  useEffect(() => {
    if (!paramRole) {
      navigate(`/login/employee`, { replace: true });
    }
  }, [paramRole, navigate]);

  // Update URL when role changes
  useEffect(() => {
    if (role !== paramRole) {
      navigate(`/login/${role}`, { replace: true });
    }
  }, [role, paramRole, navigate]);

  // Function to get the appropriate background image based on role
  const getBackgroundImage = () => {
    switch (role) {
      case "employee":
        return employeeBgImage;
      case "company":
        return companyBgImage;
      case "admin":
        return adminBgImage;
      default:
        return employeeBgImage;
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center transition-all duration-500"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="relative border rounded-lg shadow-xl p-8 w-full max-w-md transition-all hover:shadow-2xl bg-white bg-opacity-80">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h1>

        <div className="flex justify-around mb-4 border-b pb-2">
          {["employee", "company", "admin"].map((r) => (
            <Button
              key={r}
              type={role === r ? "primary" : "default"}
              onClick={() => setRole(r)}
              className="transition-all hover:scale-105"
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </Button>
          ))}
        </div>

        {role === "employee" && <EmployeeForm />}
        {role === "company" && <CompanyForm />}
        {role === "admin" && <AdminForm />}
      </div>
    </div>
  );
};

export default LoginPage;
