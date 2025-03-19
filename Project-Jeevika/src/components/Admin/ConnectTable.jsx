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
    
    // Request initial connections data from server
    socket.emit("getConnections");
    
    // Listen for initial connections data
    socket.on("connectionsData", (data) => {
      console.log("📊 Initial Connections Data Received:", data);
      setConnections(data);
      setLoading(false);
    });
    
    // Listen for new connection requests
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
    });

    // Handle connection errors
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setLoading(false);
    });

    return () => {
      socket.off("connectionsData");
      socket.off("newEnquiry");
      socket.off("connect_error");
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