import React, { useEffect, useState } from "react";
import { getProfile } from "../utils/api";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import Loader from "../components/Loader"; // Tumhara custom Loader component import kiya
import { Layout } from "antd";

const { Content, Sider } = Layout;

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (err) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [navigate]);

  return (
    <Layout className="min-h-screen w-full bg-gray-200">
      {/* Sidebar */}
      <Sider width={250} className="bg-white shadow-lg min-h-screen">
      {user && <DashboardSidebar userRole={user?.user?.role} />}
      </Sider>

      {/* Main Content */}
      <Layout className="bg-gray-200 flex justify-center items-center w-full min-h-screen">
        <Content className="flex flex-col justify-center items-center w-full">
          {loading ? (
            <Loader /> // Tumhara custom loader use kiya yaha
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl text-center">
              <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.user?.name}!</h1>
              <h1 className="text-3xl font-bold text-gray-800">Role: {user?.user?.role}!</h1>
              <p className="text-gray-600 mt-2">This is your dashboard.</p>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
