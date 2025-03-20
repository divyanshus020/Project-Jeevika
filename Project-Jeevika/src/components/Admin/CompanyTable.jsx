import React, { useState } from "react";
import { Table, Button, Modal, Descriptions, Divider, Input } from "antd";

const { Search } = Input;

const CompanyTable = ({ companies, dataLoading }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleModalClose = () => {
    setDetailModalVisible(false);
    setSelectedCompany(null);
  };

  // Filter companies across all fields
  const filteredCompanies = companies.filter((company) =>
    Object.values(company).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    { title: "Company Name", dataIndex: "companyName", key: "companyName" },
    { title: "Industry", dataIndex: "industryDepartment", key: "industryDepartment" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            setSelectedCompany(record);
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
      <h2 className="text-2xl font-bold mb-4">Company Data</h2>

      {/* Global Search Box */}
      <Search
        placeholder="Search companies..."
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        className="mb-4"
      />

      {/* Company Table */}
      <Table
        dataSource={filteredCompanies}
        columns={columns}
        rowKey="_id"
        loading={dataLoading}
        pagination={{ pageSize: 5 }}
      />

      {/* Company Details Modal */}
      <Modal
        title={<span className="text-lg font-semibold">{selectedCompany?.companyName}</span>}
        open={detailModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" type="primary" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedCompany && (
          <>
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Industry">{selectedCompany.industryDepartment}</Descriptions.Item>
              <Descriptions.Item label="Category">{selectedCompany.category}</Descriptions.Item>
              <Descriptions.Item label="Founded Date">{selectedCompany.foundedDate}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Email">{selectedCompany.email}</Descriptions.Item>
              <Descriptions.Item label="Contact Number">{selectedCompany.mobileNumber}</Descriptions.Item>
              <Descriptions.Item label="Address">{selectedCompany.address}</Descriptions.Item>
              <Descriptions.Item label="Pincode">{selectedCompany.pincode}</Descriptions.Item>
              <Descriptions.Item label="Requirement">{selectedCompany.requirement}</Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Modal>
    </div>
  );
};

export default CompanyTable;
