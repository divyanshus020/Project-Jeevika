import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Descriptions, Divider, Input, Select, Space, Tag, Dropdown, Menu } from "antd";
import { SearchOutlined, FilterOutlined, SortAscendingOutlined, SortDescendingOutlined, DownOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

const EmployeeTable = ({ employees, dataLoading }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filters, setFilters] = useState({
    jobRole: null,
    salaryRange: null,
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  // Extract unique job roles for filter dropdown
  const jobRoles = [...new Set(employees.map(emp => emp.jobRole))];
  
  // Salary range options for filtering
  const salaryRanges = [
    { label: "Under ₹10,000", value: "0-10000" },
    { label: "₹10,000 - ₹20,000", value: "10000-20000" },
    { label: "₹20,000 - ₹30,000", value: "20000-30000" },
    { label: "Above ₹30,000", value: "30000+" },
  ];

  useEffect(() => {
    let result = [...employees];
    
    // Apply search filter
    if (searchText) {
      result = result.filter((employee) =>
        Object.values(employee).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
    
    // Apply job role filter
    if (filters.jobRole) {
      result = result.filter(emp => emp.jobRole === filters.jobRole);
    }
    
    // Apply salary range filter
    if (filters.salaryRange) {
      const [min, max] = filters.salaryRange.split('-');
      if (max === '+') {
        result = result.filter(emp => parseInt(emp.expectedSalary) > parseInt(min));
      } else {
        result = result.filter(emp => 
          parseInt(emp.expectedSalary) >= parseInt(min) && 
          parseInt(emp.expectedSalary) <= parseInt(max)
        );
      }
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredEmployees(result);
  }, [employees, searchText, filters, sortConfig]);

  const handleModalClose = () => {
    setDetailModalVisible(false);
    setSelectedEmployee(null);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const resetFilters = () => {
    setFilters({
      jobRole: null,
      salaryRange: null,
    });
    setSortConfig({
      key: null,
      direction: null,
    });
    setSearchText("");
  };

  // Filter menu for dropdown
  const filterMenu = (
    <Menu>
      <Menu.SubMenu key="jobRole" title="Job Role">
        {jobRoles.map(role => (
          <Menu.Item 
            key={role} 
            onClick={() => setFilters({...filters, jobRole: role})}
          >
            {role}
          </Menu.Item>
        ))}
      </Menu.SubMenu>
      <Menu.SubMenu key="salary" title="Salary Range">
        {salaryRanges.map(range => (
          <Menu.Item 
            key={range.value} 
            onClick={() => setFilters({...filters, salaryRange: range.value})}
          >
            {range.label}
          </Menu.Item>
        ))}
      </Menu.SubMenu>
    </Menu>
  );

  // Sort menu for dropdown
  const sortMenu = (
    <Menu>
      <Menu.Item key="nameAsc" onClick={() => handleSort('name')}>
        <SortAscendingOutlined /> Name (A-Z)
      </Menu.Item>
      <Menu.Item key="nameDesc" onClick={() => handleSort('name')}>
        <SortDescendingOutlined /> Name (Z-A)
      </Menu.Item>
      <Menu.Item key="salaryAsc" onClick={() => handleSort('expectedSalary')}>
        <SortAscendingOutlined /> Salary (Low to High)
      </Menu.Item>
      <Menu.Item key="salaryDesc" onClick={() => handleSort('expectedSalary')}>
        <SortDescendingOutlined /> Salary (High to Low)
      </Menu.Item>
    </Menu>
  );

  const columns = [
    { 
      title: "Name", 
      dataIndex: "name", 
      key: "name",
      render: (text) => <span className="font-medium">{text}</span>
    },
    { 
      title: "Job Role", 
      dataIndex: "jobRole", 
      key: "jobRole",
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    { 
      title: "Expected Salary", 
      dataIndex: "expectedSalary", 
      key: "expectedSalary",
      render: (text) => <span>₹{text}</span>
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => {
            setSelectedEmployee(record);
            setDetailModalVisible(true);
          }}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-4">Employee Data</h2>

      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {/* Unified Search Bar */}
          <Input
            placeholder="Search employees..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            allowClear
            className="w-64"
          />
          
          {/* Dropdown Filter Button */}
          <Dropdown overlay={filterMenu} trigger={['click']}>
            <Button icon={<FilterOutlined />}>
              Filter <DownOutlined />
            </Button>
          </Dropdown>
          
          {/* Dropdown Sort Button */}
          <Dropdown overlay={sortMenu} trigger={['click']}>
            <Button icon={<SortAscendingOutlined />}>
              Sort <DownOutlined />
            </Button>
          </Dropdown>
          
          {/* Reset Button */}
          {(filters.jobRole || filters.salaryRange || sortConfig.key || searchText) && (
            <Button onClick={resetFilters} danger>Reset</Button>
          )}
        </div>
      </div>

      {/* Filter Tags */}
      <div className="mb-4">
        {filters.jobRole && (
          <Tag 
            color="blue" 
            closable 
            onClose={() => setFilters({...filters, jobRole: null})}
          >
            Job: {filters.jobRole}
          </Tag>
        )}
        {filters.salaryRange && (
          <Tag 
            color="green" 
            closable 
            onClose={() => setFilters({...filters, salaryRange: null})}
          >
            Salary: {salaryRanges.find(r => r.value === filters.salaryRange)?.label}
          </Tag>
        )}
        {sortConfig.key && (
          <Tag 
            color="purple" 
            closable 
            onClose={() => setSortConfig({key: null, direction: null})}
          >
            Sorted by: {sortConfig.key} ({sortConfig.direction})
          </Tag>
        )}
      </div>

      {/* Employee Table */}
      <Table
        dataSource={filteredEmployees}
        columns={columns}
        rowKey="_id"
        loading={dataLoading}
        pagination={{ pageSize: 10 }}
      />

      {/* Employee Details Modal */}
      <Modal
        title={<span className="text-lg font-semibold">{selectedEmployee?.name}</span>}
        open={detailModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" type="primary" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedEmployee && (
          <>
            {/* Job & Experience Details */}
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Job Role">{selectedEmployee.jobRole}</Descriptions.Item>
              <Descriptions.Item label="Work Experience">{selectedEmployee.workExperience}</Descriptions.Item>
              <Descriptions.Item label="Expected Salary">₹{selectedEmployee.expectedSalary}</Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* Personal & Contact Information */}
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Date of Birth">
                {new Date(selectedEmployee.dob).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{selectedEmployee.email}</Descriptions.Item>
              <Descriptions.Item label="Mobile">{selectedEmployee.mobile}</Descriptions.Item>
              <Descriptions.Item label="Address">{selectedEmployee.address}</Descriptions.Item>
              <Descriptions.Item label="Pincode">{selectedEmployee.pincode}</Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Modal>
    </div>
  );
};

export default EmployeeTable;
