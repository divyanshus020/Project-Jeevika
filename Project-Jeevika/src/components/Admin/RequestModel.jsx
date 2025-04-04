import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Modal, message } from "antd";
import {
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { getMessages, deleteMessage } from "../../utils/api"; // Import the API functions

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
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await getMessages();
      console.log("API Response:", response);
      
      // The data is nested one level deeper
      let requests = [];
      
      // This is the correct way to access your data based on the response structure
      if (response && response.data && response.data.data && Array.isArray(response.data.data)) {
        console.log("Using correct data path:", response.data.data);
        requests = response.data.data;
      } else if (response && response.data && Array.isArray(response.data)) {
        console.log("Using response.data array:", response.data);
        requests = response.data;
      } else {
        console.error("Unexpected response format:", response);
        message.error("Failed to parse response data");
        requests = [];
      }
      
      // Rest of your code for formatting and displaying data...
      const formattedData = requests.map((request, index) => {
        return {
          key: request._id || `req-${index}`,
          companyName: request.companyName || 'Unknown',
          companyNumber: request.companyNumber || 'N/A',
          companyEmail: request.companyEmail || 'N/A',
          message: request.message || 'No message',
        };
      });
      
      setData(formattedData);
      
      if (formattedData.length === 0) {
        message.info("No company requests found");
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      message.error("Failed to load company requests");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const showConfirmModal = (record, action = "approve") => {
    console.log("Opening modal for record:", record, "Action:", action);
    setCurrentRequestId(record.key);
    setCurrentRequest({ ...record, action });
    setConfirmModalVisible(true);
  };

  const handleApprove = async () => {
    try {
      console.log("Approving request with ID:", currentRequestId);
      const response = await deleteMessage(currentRequestId, "approve");
      console.log("Approval response:", response);
      
      // Remove the approved request from the data
      setData((prevData) => prevData.filter((item) => item.key !== currentRequestId));
      message.success("Request approved successfully");
    } catch (error) {
      console.error("Error approving request:", error);
      message.error("Failed to approve request");
    } finally {
      setConfirmModalVisible(false);
      setCurrentRequestId(null);
      setCurrentRequest(null);
    }
  };

  const handleReject = async () => {
    try {
      console.log("Rejecting request with ID:", currentRequestId);
      const response = await deleteMessage(currentRequestId, "reject");
      console.log("Rejection response:", response);
      
      // Remove the rejected request from the data
      setData((prevData) => prevData.filter((item) => item.key !== currentRequestId));
      message.success("Request rejected successfully");
    } catch (error) {
      console.error("Error rejecting request:", error);
      message.error("Failed to reject request");
    } finally {
      setConfirmModalVisible(false);
      setCurrentRequestId(null);
      setCurrentRequest(null);
    }
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
          <Button type="primary" onClick={() => showConfirmModal(record, "approve")}>
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
      {data.length === 0 && !loading && (
        <div className="p-4 text-center bg-gray-50 rounded">
          No company requests found. {/* Show when there's no data */}
        </div>
      )}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
        bordered
        loading={loading}
        locale={{ emptyText: 'No company requests found' }} // Custom empty message
      />
      <Button 
        type="default" 
        onClick={fetchRequests} 
        className="mt-4"
      >
        Refresh Data
      </Button>
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