import React, { useState, useEffect } from "react";
import { Table, Typography, Card, Button, Input, Space, Select, DatePicker, Dropdown, Menu, Tag, Modal } from "antd";
import { io } from "socket.io-client";
import { 
  SearchOutlined, 
  FilterOutlined, 
  SortAscendingOutlined, 
  SortDescendingOutlined, 
  DownOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const socket = io("http://localhost:8080");

const ConnectTable = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredConnections, setFilteredConnections] = useState([]);
  const [filters, setFilters] = useState({
    companyName: "",
    employeeName: "",
    dateRange: [],
  });
  const [sortField, setSortField] = useState("requestDate");
  const [sortOrder, setSortOrder] = useState("descend");
  const [filterVisible, setFilterVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [currentConnectionId, setCurrentConnectionId] = useState(null);
  const [currentConnection, setCurrentConnection] = useState(null);
 
  useEffect(() => {
    fetchConnections();

    socket.on("newEnquiry", (data) => {
      console.log("Received new enquiry:", data);
      const newConnection = {
        id: Date.now(),
        _id: Date.now().toString(),
        companyName: data.companyName || "Unknown Company",
        companyNumber: data.companyNumber || "N/A",
        employeeName: data.employeeName || "Unknown Employee",
        employeeNumber: data.employeeNumber || "N/A",
        requestDate: new Date().toLocaleString(),
      };
      
      setConnections((prev) => [newConnection, ...prev]);
      applyFiltersAndSort([newConnection, ...connections]);
    });

    socket.on("requestRemoved", (connectionId) => {
      setConnections((prevConnections) =>
        prevConnections.filter((conn) => conn._id !== connectionId)
      );
      setFilteredConnections((prevConnections) =>
        prevConnections.filter((conn) => conn._id !== connectionId)
      );
    });

    return () => {
      socket.off("connectionsData");
      socket.off("newEnquiry");
      socket.off("connect_error");
      socket.off("requestRemoved");
    };
  }, []);

  const fetchConnections = () => {
    setLoading(true);
    socket.emit("getConnections");
    
    socket.on("connectionsData", (data) => {
      setConnections(data);
      setFilteredConnections(data);
      setLoading(false);
    });

    socket.on("connect_error", () => {
      setLoading(false);
    });
  };

  useEffect(() => {
    applyFiltersAndSort(connections);
  }, [searchText, filters, sortField, sortOrder, connections]);

  const showConfirmModal = (connection) => {
    setCurrentConnectionId(connection._id);
    setCurrentConnection(connection);
    setConfirmModalVisible(true);
  };

  const handleConfirmDone = () => {
    socket.emit("markAsDone", currentConnectionId);
    setConfirmModalVisible(false);
  };

  const handleCancelConfirm = () => {
    setConfirmModalVisible(false);
    setCurrentConnectionId(null);
    setCurrentConnection(null);
  };

  const applyFiltersAndSort = (data) => {
    // First apply search filter
    let result = data.filter((connection) =>
      Object.values(connection).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );

    // Apply specific filters
    if (filters.companyName) {
      result = result.filter((item) =>
        item.companyName.toLowerCase().includes(filters.companyName.toLowerCase())
      );
    }

    if (filters.employeeName) {
      result = result.filter((item) =>
        item.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase())
      );
    }

    if (filters.dateRange && filters.dateRange.length === 2) {
      const startDate = filters.dateRange[0].startOf('day');
      const endDate = filters.dateRange[1].endOf('day');
      
      result = result.filter((item) => {
        const itemDate = new Date(item.requestDate);
        return itemDate >= startDate.toDate() && itemDate <= endDate.toDate();
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      if (a[sortField] < b[sortField]) {
        comparison = -1;
      } else if (a[sortField] > b[sortField]) {
        comparison = 1;
      }
      
      return sortOrder === "ascend" ? comparison : -comparison;
    });

    setFilteredConnections(result);
  };

  // Standardized sort handler (similar to CompanyDashboard.jsx)
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "ascend" ? "descend" : "ascend");
    } else {
      setSortField(field);
      setSortOrder("ascend");
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    setFilters({
      companyName: "",
      employeeName: "",
      dateRange: [],
    });
    setSearchText("");
  };

  // Standardized filter toggle (similar to CompanyDashboard.jsx)
  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  // Count active filters
  const activeFiltersCount = Object.values(filters).filter(val => 
    val && (Array.isArray(val) ? val.length > 0 : val.trim() !== "")
  ).length;

  const connectionColumns = [
    {
      title: (
        <div className="flex items-center">
          <span>Company Name</span>
          <Button 
            type="text" 
            size="small"
            onClick={() => handleSort("companyName")}
            icon={sortField === "companyName" ? 
              (sortOrder === "ascend" ? <SortAscendingOutlined /> : <SortDescendingOutlined />) : 
              <SortAscendingOutlined style={{ color: '#bfbfbf' }} />}
          />
        </div>
      ),
      dataIndex: "companyName",
      key: "companyName",
      sorter: true,
      sortOrder: sortField === "companyName" && sortOrder,
    },
    {
      title: "Company Number",
      dataIndex: "companyNumber",
      key: "companyNumber",
    },
    {
      title: (
        <div className="flex items-center">
          <span>Employee Name</span>
          <Button 
            type="text" 
            size="small"
            onClick={() => handleSort("employeeName")}
            icon={sortField === "employeeName" ? 
              (sortOrder === "ascend" ? <SortAscendingOutlined /> : <SortDescendingOutlined />) : 
              <SortAscendingOutlined style={{ color: '#bfbfbf' }} />}
          />
        </div>
      ),
      dataIndex: "employeeName",
      key: "employeeName",
      sorter: true,
      sortOrder: sortField === "employeeName" && sortOrder,
    },
    {
      title: "Employee Number",
      dataIndex: "employeeNumber",
      key: "employeeNumber",
    },
    {
      title: (
        <div className="flex items-center">
          <span>Request Date</span>
          <Button 
            type="text" 
            size="small"
            onClick={() => handleSort("requestDate")}
            icon={sortField === "requestDate" ? 
              (sortOrder === "ascend" ? <SortAscendingOutlined /> : <SortDescendingOutlined />) : 
              <SortAscendingOutlined style={{ color: '#bfbfbf' }} />}
          />
        </div>
      ),
      dataIndex: "requestDate",
      key: "requestDate",
      sorter: true,
      sortOrder: sortField === "requestDate" && sortOrder,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => showConfirmModal(record)}>
          Done
        </Button>
      ),
    },
  ];

  return (
    <Card className="w-full shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <Title level={4} className="m-0">Connection Requests</Title>
        
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <Search
            placeholder="Search connections..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            className="w-full md:w-64"
          />
          
          <div className="flex gap-2">
            {/* Filter Button with Badge */}
            <Button 
              type={filterVisible ? "primary" : "default"}
              icon={<FilterOutlined />} 
              onClick={toggleFilter}
            >
              Filters {activeFiltersCount > 0 && <Tag color="blue" className="ml-1">{activeFiltersCount}</Tag>}
            </Button>
            
            {/* Refresh Button */}
            <Button icon={<ReloadOutlined />} onClick={fetchConnections} />
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {filterVisible && (
        <Card className="mb-4 bg-gray-50 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="mb-1 text-sm font-medium">Company Name</p>
              <Input
                placeholder="Filter by company name"
                value={filters.companyName}
                onChange={(e) => handleFilterChange("companyName", e.target.value)}
                allowClear
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Employee Name</p>
              <Input
                placeholder="Filter by employee name"
                value={filters.employeeName}
                onChange={(e) => handleFilterChange("employeeName", e.target.value)}
                allowClear
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Date Range</p>
              <RangePicker
                value={filters.dateRange}
                onChange={(dates) => handleFilterChange("dateRange", dates)}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={resetFilters} className="mr-2">
              Reset Filters
            </Button>
          </div>
        </Card>
      )}

      {/* Table with Filtered Data */}
      <Table
        columns={connectionColumns}
        dataSource={filteredConnections}
        rowKey={(record) => record.id || record._id}
        pagination={{ 
          pageSize: 10, 
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`
        }}
        loading={loading}
        onChange={(pagination, filters, sorter) => {
          if (sorter && sorter.field) {
            setSortField(sorter.field);
            setSortOrder(sorter.order || "ascend");
          }
        }}
        className="connection-table"
      />

      {/* Confirmation Modal */}
      <Modal
        title={<div className="flex items-center"><ExclamationCircleOutlined className="text-yellow-500 mr-2" /> Confirm Action</div>}
        visible={confirmModalVisible}
        onOk={handleConfirmDone}
        onCancel={handleCancelConfirm}
        okText="Yes, Mark as Done"
        cancelText="Cancel"
      >
        <p>Are you sure you want to mark this connection request as done?</p>
        {currentConnection && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p><strong>Company:</strong> {currentConnection.companyName}</p>
            <p><strong>Employee:</strong> {currentConnection.employeeName}</p>
            <p><strong>Request Date:</strong> {currentConnection.requestDate}</p>
          </div>
        )}
        <p className="mt-4 text-gray-600">This action will remove the request from the active connections list.</p>
      </Modal>
    </Card>
  );
};

export default ConnectTable;
