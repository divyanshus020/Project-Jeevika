import React, { useEffect, useState, useRef } from "react";
import { Button } from "antd";
import NET from "vanta/dist/vanta.net.min.js";
import * as THREE from "three";
import EmployeeForm from "../components/EmployeeForm";
import CompanyForm from "../components/CompanyForm";
import AdminForm from "../components/AdminForm";

const LoginPage = () => {
  const [role, setRole] = useState("employee");
  const vantaContainerRef = useRef(null); // ✅ Corrected reference

  useEffect(() => {
    if (vantaContainerRef.current) {
      const vantaEffect = NET({
        el: vantaContainerRef.current, // ✅ Fix: Reference valid DOM element
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xff3f81,
        backgroundColor: 0x0, // Darker shade for visibility
        points: 10.0,
        maxDistance: 20.0,
        spacing: 15.0,
      });

      return () => {
        if (vantaEffect) vantaEffect.destroy(); // ✅ Proper cleanup
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* ✅ Fix: Use ref instead of ID */}
      <div
        ref={vantaContainerRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      ></div>

      <div className="relative bg-white/80 backdrop-blur-md border rounded-lg shadow-xl p-8 w-full max-w-md transition-all hover:shadow-2xl">
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
