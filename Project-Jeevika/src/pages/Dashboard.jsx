import { useEffect, useState } from "react";
import { getProfile } from "../utils/api";
import { useNavigate } from "react-router-dom";
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
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Welcome, {user?.fullName || "User"}</h2>
        </div>
      </div>
    </>
  );
}
