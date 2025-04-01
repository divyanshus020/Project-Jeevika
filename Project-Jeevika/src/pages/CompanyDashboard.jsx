import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Modal, Button, message, Table, Select, Input, Space, Dropdown, Menu } from "antd";
import { getAllEmployees } from "../utils/api";
import io from "socket.io-client";
import { SearchOutlined, FilterOutlined, SortAscendingOutlined } from '@ant-design/icons';

// Import the new modal components
import CompanyProfileModal from '../components/Company/CompanyProfileModel';
import EmployeeProfileModal from '../components/Company/EmployeeCardModel';

const { Content } = Layout;
const { Option } = Select;
const socket = io("http://localhost:8080");

const CompanyDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [companyProfileModalVisible, setCompanyProfileModalVisible] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [employeeLoading, setEmployeeLoading] = useState(false);
  const [showEmployeeTable, setShowEmployeeTable] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeProfileModalVisible, setEmployeeProfileModalVisible] = useState(false);
  const [enquiryModalVisible, setEnquiryModalVisible] = useState(false);
  const [employeeForEnquiry, setEmployeeForEnquiry] = useState(null);

  // Filtering and sorting states
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [jobRoleFilter, setJobRoleFilter] = useState('');
  const [salaryRange, setSalaryRange] = useState({ min: '', max: '' });
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const [showJeevikaButton, setShowJeevikaButton] = useState(false);
  const [jeevikaModalVisible, setJeevikaModalVisible] = useState(false);
  const [jeevikaRequestMessage, setJeevikaRequestMessage] = useState('');

  // Add a function to refresh company data from sessionStorage
  const refreshCompanyData = () => {
    const storedCompany = sessionStorage.getItem("companyData");
    if (storedCompany) {
      const updatedCompany = JSON.parse(storedCompany);
      console.log("Refreshing company data:", updatedCompany);
      setCompany(updatedCompany);
    }
  };

  useEffect(() => {
    const storedCompany = sessionStorage.getItem("companyData");
    if (storedCompany) {
      setCompany(JSON.parse(storedCompany));
    } else {
      message.error("Unauthorized access. Redirecting to login.");
      navigate("/");
    }
    setLoading(false);
  }, [navigate]);

  // Apply filters and sorting whenever employees or filter criteria change
  useEffect(() => {
    if (employees.length > 0) {
      applyFiltersAndSort();
    }
  }, [employees, searchText, jobRoleFilter, salaryRange, sortField, sortOrder]);

  const applyFiltersAndSort = () => {
    let result = [...employees];

    // Apply search filter
    if (searchText) {
      result = result.filter(emp =>
        emp.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply job role filter
    if (jobRoleFilter) {
      result = result.filter(emp => emp.jobRole === jobRoleFilter);
    }

    // Apply salary range filter
    if (salaryRange.min) {
      result = result.filter(emp => Number(emp.expectedSalary) >= Number(salaryRange.min));
    }
    if (salaryRange.max) {
      result = result.filter(emp => Number(emp.expectedSalary) <= Number(salaryRange.max));
    }

    // Apply sorting
    result.sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      // Convert to numbers for salary comparison
      if (sortField === 'expectedSalary') {
        valueA = Number(valueA);
        valueB = Number(valueB);
      }

      if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredEmployees(result);
  };

  const resetFilters = () => {
    setSearchText('');
    setJobRoleFilter('');
    setSalaryRange({ min: '', max: '' });
    setSortField('name');
    setSortOrder('asc');
    setFilteredEmployees(employees);
  };

  const sendEnquiryNotification = (employee) => {
    if (!company) {
      message.error("Company data not found. Please log in again.");
      return;
    }

    const notificationData = {
      companyName: company.companyName,
      companyNumber: company.mobileNumber,
      employeeName: employee.name,
      employeeNumber: employee.mobile,
    };
    console.log(employee);
    socket.emit("enquiry", notificationData);
    message.success(`Enquiry sent for ${employee.name}`);
    setEnquiryModalVisible(false);
  };

  const showEnquiryConfirmation = (employee) => {
    setEmployeeForEnquiry(employee);
    setEnquiryModalVisible(true);
  };

  const fetchEmployees = async () => {
    setEmployeeLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await getAllEmployees(token);
      if (response?.data?.success && Array.isArray(response.data.data)) {
        setEmployees(response.data.data);
        setFilteredEmployees(response.data.data);
        setShowJeevikaButton(true);
      } else {
        message.error("Unexpected response format from server.");
      }
    } catch (error) {
      message.error("Failed to fetch employees.");
    } finally {
      setEmployeeLoading(false);
      setShowEmployeeTable(true);
    }
  };

  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setEmployeeProfileModalVisible(true);
  };

  const confirmLogout = () => {
    sessionStorage.removeItem("companyData");
    sessionStorage.removeItem("token");
    message.success("Logged out successfully!");
    navigate("/");
  };

  // Get unique job roles for filter dropdown
  const getUniqueJobRoles = () => {
    const jobRoles = employees.map(emp => emp.jobRole);
    return [...new Set(jobRoles)];
  };

  const employeeColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Job Role",
      dataIndex: "jobRole",
      key: "jobRole",
      sorter: true,
    },
    {
      title: "Expected Salary",
      dataIndex: "expectedSalary",
      key: "expectedSalary",
      sorter: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleViewProfile(record)}>View Profile</Button>
          <Button
            type="primary"
            className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600 rounded-md"
            onClick={() => showEnquiryConfirmation(record)}
          >
            Enquiry
          </Button>
        </>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter && sorter.field) {
      setSortField(sorter.field);
      setSortOrder(sorter.order === 'ascend' ? 'asc' : 'desc');
    }
  };

  const sortMenu = (
    <Menu>
      <Menu.Item key="name-asc" onClick={() => { setSortField('name'); setSortOrder('asc'); }}>
        Name (A-Z)
      </Menu.Item>
      <Menu.Item key="name-desc" onClick={() => { setSortField('name'); setSortOrder('desc'); }}>
        Name (Z-A)
      </Menu.Item>
      <Menu.Item key="salary-asc" onClick={() => { setSortField('expectedSalary'); setSortOrder('asc'); }}>
        Salary (Low to High)
      </Menu.Item>
      <Menu.Item key="salary-desc" onClick={() => { setSortField('expectedSalary'); setSortOrder('desc'); }}>
        Salary (High to Low)
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="w-full h-[80vh] bg-gray-200">
      <div className="w-full bg-white p-4 flex justify-between items-center shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Company Dashboard</h2>
        <div className="flex gap-4">
          <Button type="primary" onClick={() => setCompanyProfileModalVisible(true)}>Profile</Button>
          <Button type="default" onClick={fetchEmployees} loading={employeeLoading}>Employee Card</Button>
          <Button danger onClick={() => setLogoutModalVisible(true)}>Logout</Button>
        </div>
      </div>

      <Content className="p-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold">Welcome, {company?.companyName || "Company"}!</h1>
            <p className="text-gray-600 mt-2">This is your Company Dashboard.</p>
          </div>
        )}

        {showEmployeeTable && (
          <div className="bg-white p-6 mt-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Employees</h2>
              <Space>
                <Input
                  placeholder="Search by name"
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: 200 }}
                />
                <Button
                  icon={<FilterOutlined />}
                  onClick={() => setFilterModalVisible(true)}
                >
                  Filter
                </Button>
                <Dropdown overlay={sortMenu} placement="bottomRight">
                  <Button icon={<SortAscendingOutlined />}>
                    Sort
                  </Button>
                </Dropdown>
                <Button onClick={resetFilters}>Reset</Button>
              </Space>
            </div>

            {showJeevikaButton && (
              <Button
                type="primary"
                className="mt-4"
                onClick={() => setJeevikaModalVisible(true)}
              >
                Jeevika find you employee
              </Button>
            )}

            {/* Jeevika Find Employee Modal */}
            <Modal
              title="Jeevika Employee Finder"
              open={jeevikaModalVisible}
              onOk={() => {
                // Send the request via websocket
                if (!company) {
                  message.error("Company data not found. Please log in again.");
                  return;
                }

                const requestData = {
                  companyName: company.companyName,
                  companyNumber: company.mobileNumber,
                  requestMessage: jeevikaRequestMessage,
                  timestamp: new Date().toISOString()
                };

                // Emit the event through socket
                socket.emit("jeevikaEmployeeRequest", requestData);

                message.success("Your request has been submitted. Jeevika will find suitable employees for you!");
                setJeevikaRequestMessage(''); // Clear the message
                setJeevikaModalVisible(false);
              }}
              onCancel={() => setJeevikaModalVisible(false)}
              okText="Submit Request"
              cancelText="Cancel"
            >
              <p>Let Jeevika's AI-powered system find the perfect employees for your business needs!</p>
              <div className="mt-4">
                <p className="font-semibold mb-2">What kind of employees are you looking for?</p>
                <Input.TextArea
                  rows={4}
                  placeholder="Describe the skills, experience, and qualities you're looking for in potential employees..."
                  value={jeevikaRequestMessage}
                  onChange={(e) => setJeevikaRequestMessage(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Our system will analyze your requirements and match you with the most suitable candidates from our database.
                  You'll receive notifications when we find potential matches.
                </p>
              </div>
            </Modal>

            <Table
              dataSource={filteredEmployees}
              columns={employeeColumns}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
              onChange={handleTableChange}
            />
          </div>
        )}
      </Content>

      {/* Company Profile Modal - UPDATED */}
      <CompanyProfileModal
        company={company}
        visible={companyProfileModalVisible}
        onClose={(updatedData) => {
          console.log("Profile modal closed with data:", updatedData);
          if (updatedData) {
            // Update the company state with the new data
            setCompany(updatedData);
          } else {
            // If no data was passed, refresh from sessionStorage as fallback
            refreshCompanyData();
          }
          setCompanyProfileModalVisible(false);
        }}
      />

      {/* Employee Profile Modal */}
      <EmployeeProfileModal
        employee={selectedEmployee}
        visible={employeeProfileModalVisible}
        onClose={() => setEmployeeProfileModalVisible(false)}
      />

      {/* Confirm Enquiry Modal */}
      <Modal
        title="Confirm Enquiry"
        open={enquiryModalVisible}
        onOk={() => employeeForEnquiry && sendEnquiryNotification(employeeForEnquiry)}
        onCancel={() => setEnquiryModalVisible(false)}
        okText="Yes, Send Enquiry"
        cancelText="Cancel"
      >
        {employeeForEnquiry && (
          <div>
            <p>Are you sure you want to send an enquiry for <strong>{employeeForEnquiry.name}</strong>?</p>
            <p className="mt-2">This will notify the employee about your interest.</p>
          </div>
        )}
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        open={logoutModalVisible}
        onOk={confirmLogout}
        onCancel={() => setLogoutModalVisible(false)}
        okText="Yes, Logout"
        cancelText="No"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>

      {/* Filter Modal */}
      <Modal
        title="Filter Employees"
        open={filterModalVisible}
        onCancel={() => setFilterModalVisible(false)}
        footer={[
          <Button key="reset" onClick={resetFilters}>
            Reset Filters
          </Button>,
          <Button key="apply" type="primary" onClick={() => setFilterModalVisible(false)}>
            Apply
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Job Role</label>
            <Select
              style={{ width: '100%' }}
              placeholder="Select job role"
              value={jobRoleFilter}
              onChange={value => setJobRoleFilter(value)}
              allowClear
            >
              {getUniqueJobRoles().map(role => (
                <Option key={role} value={role}>{role}</Option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block mb-1">Salary Range</label>
            <div className="flex gap-2">
              <Input
                placeholder="Min"
                type="number"
                value={salaryRange.min}
                onChange={e => setSalaryRange({ ...salaryRange, min: e.target.value })}
                style={{ width: '50%' }}
              />
              <Input
                placeholder="Max"
                type="number"
                value={salaryRange.max}
                onChange={e => setSalaryRange({ ...salaryRange, max: e.target.value })}
                style={{ width: '50%' }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default CompanyDashboard;