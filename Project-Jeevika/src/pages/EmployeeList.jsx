import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { getAllEmployees } from "../utils/api";

const EmployeeCard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, pageSize]);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Unauthorized access. Please log in.");
        return;
      }
      const response = await getAllEmployees(token, currentPage, pageSize);
      setEmployees(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      message.error("Failed to fetch employees.");
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Job Role",
      dataIndex: "jobRole",
      key: "jobRole",
    },
    {
      title: "Expected Salary",
      dataIndex: "expectedSalary",
      key: "expectedSalary",
      render: (text) => `₹${text.toLocaleString()}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <>
          <Button type="link" onClick={() => handleViewProfile(record)}>View Profile</Button>
          <Button type="primary" onClick={() => handleEnquiry(record)}>Enquiry</Button>
        </>
      ),
    },
  ];

  const handleViewProfile = (employee) => {
    message.info(`Viewing profile of ${employee.name}`);
    // Implement modal or redirection logic
  };

  const handleEnquiry = (employee) => {
    message.success(`Enquiry sent for ${employee.name}`);
    // Implement enquiry logic
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Employee List</h2>
      <Table
        columns={columns}
        dataSource={employees}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
        }}
        rowKey="_id"
      />
    </div>
  );
};

export default EmployeeCard;
