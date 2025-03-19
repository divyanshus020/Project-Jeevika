import React from "react";
import { Button, Space, Typography } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  TeamOutlined,
  HomeOutlined,
  DatabaseOutlined,
  LinkOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const AdminNavbar = ({
  activeTab,
  setActiveTab,
  fetchEmployees,
  fetchCompanies,
  setCreateTeamModalVisible,
  setProfileModalVisible,
  handleLogout,
}) => {
  return (
    <div className="w-full bg-white p-4 flex justify-between items-center shadow-md">
      <Title level={4} className="mb-0 text-gray-800">Admin Dashboard</Title>

      <Space size="middle" className="flex items-center">
        <Button
          type={activeTab === "home" ? "primary" : "default"}
          icon={<HomeOutlined />}
          onClick={() => setActiveTab("home")}
        >
          Home
        </Button>

        <Button
          type={activeTab === "employee" ? "primary" : "default"}
          icon={<DatabaseOutlined />}
          onClick={() => {
            setActiveTab("employee");
            fetchEmployees();
          }}
        >
          Employee Data
        </Button>

        <Button
          type={activeTab === "company" ? "primary" : "default"}
          icon={<DatabaseOutlined />}
          onClick={() => {
            setActiveTab("company");
            fetchCompanies();
          }}
        >
          Company Data
        </Button>

        <Button
          type={activeTab === "connect" ? "primary" : "default"}
          icon={<LinkOutlined />}
          onClick={() => setActiveTab("connect")}
        >
          Connect
        </Button>

        <Button type="primary" icon={<TeamOutlined />} onClick={() => setCreateTeamModalVisible(true)}>
          Create Team
        </Button>

        <Button type="primary" icon={<UserOutlined />} onClick={() => setProfileModalVisible(true)}>
          Profile
        </Button>

        <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </Space>
    </div>
  );
};

export default AdminNavbar;
