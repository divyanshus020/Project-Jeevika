import { useEffect, useState } from "react";
import { getProfile } from "../utils/api";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import { Layout } from "antd";
import React from "react"
// import Navbar from "../components/Navbar";


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (err) {
        navigate("/");
      }
    }
    fetchUser();
  }, [navigate]);

  return (
    <>
      {/* <Navbar/> */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <DashboardSidebar />
      </div>
    </>
  );
}
