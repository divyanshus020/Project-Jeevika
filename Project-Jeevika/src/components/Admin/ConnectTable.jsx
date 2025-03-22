import React, { useState, useEffect } from "react";
import { Table, Typography, Card, Button, Input } from "antd";
import { io } from "socket.io-client";

const { Title } = Typography;
const { Search } = Input;
const socket = io("http://localhost:8080");

const ConnectTable = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
 
  useEffect(() => {
    socket.emit("getConnections");

    socket.on("connectionsData", (data) => {
      setConnections(data);
      setLoading(false);
    });

    socket.on("newEnquiry", (data) => {
      console.log("Received new enquiry:", data);
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

    socket.on("requestRemoved", (connectionId) => {
      setConnections((prevConnections) =>
        prevConnections.filter((conn) => conn._id !== connectionId)
      );
    });

    socket.on("connect_error", () => {
      setLoading(false);
    });

    return () => {
      socket.off("connectionsData");
      socket.off("newEnquiry");
      socket.off("connect_error");
      socket.off("requestRemoved");
    };
  }, []);

  const handleDone = (connectionId) => {
    socket.emit("markAsDone", connectionId);
  };

  // Filter data globally across all columns
  const filteredConnections = connections.filter((connection) =>
    Object.values(connection).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleDone(record._id)}>
          Done
        </Button>
      ),
    },
  ];
   console.log("filterred",filteredConnections)
  return (
    <Card className="w-full shadow-md">
      <Title level={4} className="mb-4">Connection Requests</Title>

      {/* Global Search Box */}
      <Search
        placeholder="Search across all fields..."
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        className="mb-4"
      />

      {/* Table with Filtered Data */}
      <Table
        columns={connectionColumns}
        dataSource={filteredConnections}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        loading={loading}
      />
    </Card>
  );
};

export default ConnectTable;
