import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Modal, Tag } from "antd";
import {
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const RequestModel = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [currentRequest, setCurrentRequest] = useState(null);

  useEffect(() => {
    fetchRequests();

    socket.on("companyRequests", (requests) => {
      const formattedData = requests.map((request, index) => ({
        key: request._id || index.toString(),
        companyName: request.companyName,
        companyNumber: request.companyNumber,
        companyEmail: request.companyEmail,
        message: request.message,
      }));
      setData(formattedData);
      setLoading(false);
    });

    socket.on("newCompanyRequest", (request) => {
      setData((prevData) => [
        {
          key: request._id || prevData.length.toString(),
          companyName: request.companyName,
          companyNumber: request.companyNumber,
          companyEmail: request.companyEmail,
          message: request.message,
        },
        ...prevData,
      ]);
    });

    socket.on("requestUpdated", (updatedRequest) => {
      setData((prevData) => prevData.filter((item) => item.key !== updatedRequest._id));
    });

    socket.on("connect_error", () => {
        setLoading(false);
    });

    return () => {
      socket.off("companyRequests");
      socket.off("newCompanyRequest");
      socket.off("requestUpdated");
      socket.off("connect_error");
    };
  }, []);

  const fetchRequests = () => {
    setLoading(true);
    socket.emit("getCompanyRequests");
  };

  const showConfirmModal = (record) => {
    setCurrentRequestId(record.key);
    setCurrentRequest(record);
    setConfirmModalVisible(true);
  };

  const handleApprove = () => {
    socket.emit("approveCompanyRequest", { requestId: currentRequestId });
    setConfirmModalVisible(false);
  };

  const handleReject = () => {
    socket.emit("rejectCompanyRequest", { requestId: currentRequestId });
    setConfirmModalVisible(false);
  };

  const handleCancelConfirm = () => {
    setConfirmModalVisible(false);
    setCurrentRequestId(null);
    setCurrentRequest(null);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "",
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("companyName"),
    },
    {
      title: "Company Number",
      dataIndex: "companyNumber",
      key: "companyNumber",
      ...getColumnSearchProps("companyNumber"),
    },
    {
      title: "Company Email",
      dataIndex: "companyEmail",
      key: "companyEmail",
      sorter: (a, b) => a.companyEmail.localeCompare(b.companyEmail),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("companyEmail"),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      ...getColumnSearchProps("message"),
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showConfirmModal(record)}>
            Approve
          </Button>
          <Button danger onClick={() => showConfirmModal(record, "reject")}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="request-model-container">
      <h2 className="text-2xl font-bold mb-4">Company Requests</h2>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
        bordered
        loading={loading}
      />
      <Modal
        title={<div className="flex items-center"><ExclamationCircleOutlined className="text-yellow-500 mr-2" /> Confirm Action</div>}
        visible={confirmModalVisible}
        onOk={currentRequest && currentRequest.action === "reject" ? handleReject : handleApprove}
        onCancel={handleCancelConfirm}
        okText={currentRequest && currentRequest.action === "reject" ? "Yes, Reject" : "Yes, Approve"}
        cancelText="Cancel"
      >
        <p>Are you sure you want to {currentRequest && currentRequest.action === "reject" ? "reject" : "approve"} this request?</p>
        {currentRequest && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p><strong>Company:</strong> {currentRequest.companyName}</p>
            <p><strong>Email:</strong> {currentRequest.companyEmail}</p>
            <p><strong>Message:</strong> {currentRequest.message}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RequestModel;