import React, { useState, useEffect } from "react";
import { Button, Badge, Modal, Table, Space, Typography } from "antd";
import { io } from "socket.io-client";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  TeamOutlined,
  HomeOutlined,
  DatabaseOutlined,
  EyeOutlined,
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
  const [notifications, setNotifications] = useState([]);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);

  // ✅ WebSocket: Listen for incoming notifications
  useEffect(() => {
    socket.on("newEnquiry", (data) => {
      console.log("🔔 New Notification Received:", data);
      
      // ✅ Ensure that companyName and employeeName are properly stored
      setNotifications((prev) => [
        {
          id: Date.now(), // Unique key for the table
          companyName: data.companyName || "Unknown Company",
          employeeName: data.employeeName || "Unknown Employee",
          requestDate: new Date().toLocaleString(),
        },
        ...prev,
      ]);
    });

    return () => {
      socket.off("newEnquiry");
    };
  }, []);

  // ✅ Open Notification Modal
  const handleNotificationClick = () => setIsNotificationModalVisible(true);

  // ✅ Close Notification Modal
  const handleNotificationModalCancel = () => setIsNotificationModalVisible(false);

  // ✅ Notification Table Columns
  const notificationColumns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Request Date",
      dataIndex: "requestDate",
      key: "requestDate",
      render: (text) => text || "N/A",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EyeOutlined />} onClick={() => handleViewNotificationDetails(record)}>
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  // ✅ View Notification Details
  const handleViewNotificationDetails = (record) => {
    Modal.info({
      title: "Notification Details",
      content: (
        <div>
          <p><strong>Company:</strong> {record.companyName}</p>
          <p><strong>Employee:</strong> {record.employeeName}</p>
          <p><strong>Request Date:</strong> {record.requestDate || "N/A"}</p>
        </div>
      ),
      onOk() {},
    });
  };

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

        <Badge count={notifications.length} offset={[10, -5]}>
          <Button shape="circle" icon={<BellOutlined />} onClick={handleNotificationClick} />
        </Badge>

        <Modal
          title="Notifications"
          visible={isNotificationModalVisible}
          onCancel={handleNotificationModalCancel}
          footer={null}
          width={800}
        >
          <Table
            columns={notificationColumns}
            dataSource={notifications}
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
