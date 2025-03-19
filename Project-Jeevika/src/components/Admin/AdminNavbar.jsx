import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Space, Typography } from "antd";
import { io } from "socket.io-client";
import {
  UserOutlined,
  LogoutOutlined,
  TeamOutlined,
  HomeOutlined,
  DatabaseOutlined,
  LinkOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const socket = io("http://localhost:8080"); // Update with your backend WebSocket URL

const AdminNavbar = ({
  activeTab,
  setActiveTab,
  fetchEmployees,
  fetchCompanies,
  setCreateTeamModalVisible,
  setProfileModalVisible,
  handleLogout,
}) => {
  const [connections, setConnections] = useState([]);
  const [isConnectModalVisible, setIsConnectModalVisible] = useState(false);

  // ✅ WebSocket: Listen for incoming connection data
  useEffect(() => {
    socket.on("newEnquiry", (data) => {
      console.log("🔌 New Connection Data Received:", data);
      
      // ✅ Store connection data with company and employee details
      setConnections((prev) => [
        {
          id: Date.now(), // Unique key for the table
          companyName: data.companyName || "Unknown Company",
          companyNumber: data.companyNumber || "N/A",
          employeeName: data.employeeName || "Unknown Employee",
          employeeNumber: data.employeeNumber || "N/A",
          requestDate: new Date().toLocaleString(),
        },
        ...prev,
      ]);
    });

    return () => {
      socket.off("newEnquiry");
    };
  }, []);

  // ✅ Open Connect Modal
  const handleConnectClick = () => setIsConnectModalVisible(true);

  // ✅ Close Connect Modal
  const handleConnectModalCancel = () => setIsConnectModalVisible(false);

  // ✅ Connection Table Columns
  const connectionColumns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Company Number",
      dataIndex: "companyNumber",
      key: "companyNumber",
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Employee Number",
      dataIndex: "employeeNumber",
      key: "employeeNumber",
    },
    {
      title: "Request Date",
      dataIndex: "requestDate",
      key: "requestDate",
    },
  ];

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

        <Button type="primary" icon={<TeamOutlined />} onClick={() => setCreateTeamModalVisible(true)}>
          Create Team
        </Button>

        <Button 
          type="primary" 
          icon={<LinkOutlined />} 
          onClick={handleConnectClick}
        >
          Connect
        </Button>

        <Modal
          title="Connection Requests"
          visible={isConnectModalVisible}
          onCancel={handleConnectModalCancel}
          footer={null}
          width={1000}
        >
          <Table
            columns={connectionColumns}
            dataSource={connections}
            rowKey={(record) => record.id}
            pagination={{ pageSize: 5, showSizeChanger: true }}
          />
        </Modal>

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
