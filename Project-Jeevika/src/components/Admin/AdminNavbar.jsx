import React, { useState, useEffect } from 'react';
import { Button, Badge, Dropdown, Menu, Avatar, Space, Typography, Modal, Table } from 'antd';
import { io } from "socket.io-client";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  TeamOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
  DatabaseOutlined,
  EyeOutlined
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
  handleLogout
}) => {
  const [notifications, setNotifications] = useState([]);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);

  // WebSocket Connection
  useEffect(() => {
    socket.on("newNotification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  // Notification Modal Handlers
  const handleNotificationClick = () => setIsNotificationModalVisible(true);
  const handleNotificationModalCancel = () => setIsNotificationModalVisible(false);

  const navButtons = [
    {
      key: "home",
      icon: <HomeOutlined />,
      text: "Home",
      onClick: () => setActiveTab("home"),
    },
    {
      key: "employee",
      icon: <UserOutlined />,
      text: "Employee Data",
      onClick: () => {
        setActiveTab("employee");
        fetchEmployees();
      },
    },
    {
      key: "company",
      icon: <DatabaseOutlined />,
      text: "Company Data",
      onClick: () => {
        setActiveTab("company");
        fetchCompanies();
      },
    },
  ];

  const notificationColumns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Employee Name',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Request Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EyeOutlined />} onClick={() => handleViewNotificationDetails(record)}>
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  const handleViewNotificationDetails = (record) => {
    Modal.info({
      title: 'Notification Details',
      content: (
        <div>
          <p><strong>Company:</strong> {record.companyName}</p>
          <p><strong>Employee:</strong> {record.employeeName}</p>
          <p><strong>Request Date:</strong> {record.requestDate || 'N/A'}</p>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <div className="w-full bg-white p-4 flex justify-between items-center shadow-md">
      <Title level={4} className="mb-0 text-gray-800">
        Admin Dashboard
      </Title>

      <Space size="middle" className="flex items-center">
        {navButtons.map((button) => (
          <Button
            key={button.key}
            type={activeTab === button.key ? "primary" : "default"}
            icon={button.icon}
            onClick={button.onClick}
          >
            {button.text}
          </Button>
        ))}

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
            rowKey={(record) => record.id || Math.random()}
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
