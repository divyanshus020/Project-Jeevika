import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Modal, Button, message, Descriptions, Table } from "antd";
import { getAllEmployees } from "../utils/api";
import io from "socket.io-client";

const { Content } = Layout;
const socket = io("http://localhost:8080");

const CompanyDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeLoading, setEmployeeLoading] = useState(false);
  const [showEmployeeTable, setShowEmployeeTable] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeProfileModal, setEmployeeProfileModal] = useState(false);

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
     console.log(employee)
    socket.emit("enquiry", notificationData);
    message.success(`Enquiry sent for ${employee.name}`);
  };

  const fetchEmployees = async () => {
    setEmployeeLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await getAllEmployees(token);
      if (response?.data?.success && Array.isArray(response.data.data)) {
        setEmployees(response.data.data);
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
    setEmployeeProfileModal(true);
  };

  const confirmLogout = () => {
    sessionStorage.removeItem("companyData");
    sessionStorage.removeItem("token");
    message.success("Logged out successfully!");
    navigate("/");
  };

  const employeeColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Job Role", dataIndex: "jobRole", key: "jobRole" },
    { title: "Expected Salary", dataIndex: "expectedSalary", key: "expectedSalary" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleViewProfile(record)}>View Profile</Button>
          <Button type="link" onClick={() => sendEnquiryNotification(record)}>Enquiry</Button>
        </>
      ),
    },
  ];

  return (
    <Layout className="w-full h-[80vh] bg-gray-200">
      <div className="w-full bg-white p-4 flex justify-between items-center shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Company Dashboard</h2>
        <div className="flex gap-4">
          <Button type="primary" onClick={() => setProfileModalVisible(true)}>Profile</Button>
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
            <h2 className="text-2xl font-bold mb-4">Employees</h2>
            <Table dataSource={employees} columns={employeeColumns} rowKey="_id" pagination={{ pageSize: 5 }} />
          </div>
        )}
      </Content>

      <Modal
        title="Company Profile"
        open={profileModalVisible}
        onCancel={() => setProfileModalVisible(false)}
        footer={<Button onClick={() => setProfileModalVisible(false)}>Close</Button>}
      >
        {company ? (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Company Name">{company.companyName}</Descriptions.Item>
            <Descriptions.Item label="Email">{company.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{company.mobileNumber}</Descriptions.Item>
            <Descriptions.Item label="Address">{company.address}</Descriptions.Item>
            <Descriptions.Item label="Industry">{company.industryDepartment}</Descriptions.Item>
            <Descriptions.Item label="Category">{company.category}</Descriptions.Item>
            <Descriptions.Item label="Requirement">{company.requirement}</Descriptions.Item>
          </Descriptions>
        ) : (
          <p>No company data found.</p>
        )}
      </Modal>

      <Modal
        title="Employee Profile"
        open={employeeProfileModal}
        onCancel={() => setEmployeeProfileModal(false)}
        footer={<Button onClick={() => setEmployeeProfileModal(false)}>Close</Button>}
      >
        {selectedEmployee ? (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">{selectedEmployee.name}</Descriptions.Item>
            <Descriptions.Item label="Job Role">{selectedEmployee.jobRole}</Descriptions.Item>
            <Descriptions.Item label="Experience">{selectedEmployee.workExperience}</Descriptions.Item>
            <Descriptions.Item label="DOB">{selectedEmployee.dob}</Descriptions.Item>
            <Descriptions.Item label="Expected Salary">{selectedEmployee.expectedSalary}</Descriptions.Item>
          </Descriptions>
        ) : (
          <p>No employee selected.</p>
        )}
      </Modal>

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
    </Layout>
  );
};

export default CompanyDashboard;
