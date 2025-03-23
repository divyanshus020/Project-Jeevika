import React, { useState } from "react";
import { Button } from "antd";
import EmployeeForm from "../components/EmployeeForm";
import CompanyForm from "../components/CompanyForm";
import AdminForm from "../components/AdminForm";

const LoginPage = () => {
  const [role, setRole] = useState("employee");

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      <div className="relative  border rounded-lg shadow-xl p-8 w-full max-w-md transition-all hover:shadow-2xl">
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
