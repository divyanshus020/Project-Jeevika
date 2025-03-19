import React, { useState } from "react";
import { Table, Button, Modal, Descriptions, Divider, Input } from "antd";

const { Search } = Input;

const EmployeeTable = ({ employees, dataLoading }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleModalClose = () => {
    setDetailModalVisible(false);
    setSelectedEmployee(null);
  };

  // Filter data globally across all fields
  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Job Role", dataIndex: "jobRole", key: "jobRole" },
    { title: "Expected Salary", dataIndex: "expectedSalary", key: "expectedSalary" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
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
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Employee Data</h2>

      {/* Global Search Box */}
      <Search
        placeholder="Search employees..."
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        className="mb-4"
      />

      {/* Employee Table */}
      <Table
        dataSource={filteredEmployees}
        columns={columns}
        rowKey="_id"
        loading={dataLoading}
        pagination={{ pageSize: 5 }}
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
              <Descriptions.Item label="Expected Salary">{selectedEmployee.expectedSalary}</Descriptions.Item>
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
