import React, { useState, useEffect } from "react";
import { Table, Typography, Card } from "antd";
import { io } from "socket.io-client";

const { Title } = Typography;
const socket = io("http://localhost:8080"); // Update with your backend WebSocket URL

const ConnectTable = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  // WebSocket: Listen for incoming connection data
  useEffect(() => {
    setLoading(true);
    
    // Initial data fetch could go here
    // For example: fetchConnections();
    
    socket.on("newEnquiry", (data) => {
      console.log("🔌 New Connection Data Received:", data);
      
      setConnections((prev) => [
        {
          id: Date.now(),
          companyName: data.companyName || "Unknown Company",
          companyNumber: data.companyNumber || "N/A",
          employeeName: data.employeeName || "Unknown Employee",
          employeeNumber: data.employeeNumber || "N/A",
          requestDate: new Date().toLocaleString(),
        },
        ...prev,
      ]);
      
      setLoading(false);
    });

    // Simulate initial data for demonstration
    setTimeout(() => {
      setConnections([
        {
          id: 1,
          companyName: "ABC Corp",
          companyNumber: "9876543210",
          employeeName: "John Doe",
          employeeNumber: "1234567890",
          requestDate: new Date().toLocaleString(),
        },
        {
          id: 2,
          companyName: "XYZ Industries",
          companyNumber: "8765432109",
          employeeName: "Jane Smith",
          employeeNumber: "2345678901",
          requestDate: new Date().toLocaleString(),
        }
      ]);
      setLoading(false);
    }, 1000);

    return () => {
      socket.off("newEnquiry");
    };
  }, []);

  // Connection Table Columns
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
    <Card className="w-full shadow-md">
      <Title level={4} className="mb-4">Connection Requests</Title>
      <Table
        columns={connectionColumns}
        dataSource={connections}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        loading={loading}
      />
    </Card>
  );
};

export default ConnectTable;
