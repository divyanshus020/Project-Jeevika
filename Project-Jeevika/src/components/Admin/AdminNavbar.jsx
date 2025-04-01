import React, { useState } from "react";
import { Button, Space, Typography, Drawer } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  TeamOutlined,
  HomeOutlined,
  DatabaseOutlined,
  LinkOutlined,
  MenuOutlined,
  FileTextOutlined, // Added for Request icon
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavButtons = () => (
    <Space direction={mobileMenuOpen ? "vertical" : "horizontal"} size="middle" className="items-center">
      <Button
        type={activeTab === "home" ? "primary" : "default"}
        icon={<HomeOutlined />}
        onClick={() => {
          setActiveTab("home");
          setMobileMenuOpen(false);
        }}
        block={mobileMenuOpen}
      >
        Home
      </Button>

      <Button
        type={activeTab === "employee" ? "primary" : "default"}
        icon={<DatabaseOutlined />}
        onClick={() => {
          setActiveTab("employee");
          fetchEmployees();
          setMobileMenuOpen(false);
        }}
        block={mobileMenuOpen}
      >
        Employee Data
      </Button>

      <Button
        type={activeTab === "company" ? "primary" : "default"}
        icon={<DatabaseOutlined />}
        onClick={() => {
          setActiveTab("company");
          fetchCompanies();
          setMobileMenuOpen(false);
        }}
        block={mobileMenuOpen}
      >
        Company Data
      </Button>

      <Button
        type={activeTab === "connect" ? "primary" : "default"}
        icon={<LinkOutlined />}
        onClick={() => {
          setActiveTab("connect");
          setMobileMenuOpen(false);
        }}
        block={mobileMenuOpen}
      >
        Connect
      </Button>

      {/* New Request Button */}
      <Button
        type={activeTab === "request" ? "primary" : "default"}
        icon={<FileTextOutlined />}
        onClick={() => {
          setActiveTab("request");
          setMobileMenuOpen(false);
        }}
        block={mobileMenuOpen}
      >
        Request
      </Button>

      <Button
        type="primary"
        icon={<TeamOutlined />}
        onClick={() => {
          setCreateTeamModalVisible(true);
          setMobileMenuOpen(false);
        }}
        block={mobileMenuOpen}
      >
        Create Team
      </Button>

      <Button
        type="primary"
        icon={<UserOutlined />}
        onClick={() => {
          setProfileModalVisible(true);
          setMobileMenuOpen(false);
        }}
        block={mobileMenuOpen}
      >
        Profile
      </Button>

      <Button
        danger
        icon={<LogoutOutlined />}
        onClick={() => {
          handleLogout();
          setMobileMenuOpen(false);
        }}
        block={mobileMenuOpen}
      >
        Logout
      </Button>
    </Space>
  );

  return (
    <div className="w-full bg-white p-4 flex justify-between items-center shadow-md">
      <Title level={4} className="mb-0 text-gray-800">Admin Dashboard</Title>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <NavButtons />
      </div>

      {/* Mobile Menu Button */}
      <Button
        icon={<MenuOutlined />}
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(true)}
      />


      {/* Mobile Navigation Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        className="md:hidden"
      >
        <NavButtons />
      </Drawer>
    </div>
  );
};

export default AdminNavbar;