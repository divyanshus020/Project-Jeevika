import React, { useState } from "react";
import { Table, Button, Modal, Descriptions, Divider, Input, Select, Space, Dropdown, Menu } from "antd";
import { SearchOutlined, FilterOutlined, SortAscendingOutlined, DownOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

const CompanyTable = ({ companies, dataLoading }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterIndustry, setFilterIndustry] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("ascend");

  const handleModalClose = () => {
    setDetailModalVisible(false);
    setSelectedCompany(null);
  };

  // Get unique categories and industries for filter dropdowns
  const uniqueCategories = [...new Set(companies.map(company => company.category))];
  const uniqueIndustries = [...new Set(companies.map(company => company.industryDepartment))];

  // Filter companies based on search text and selected filters
  const filteredCompanies = companies.filter((company) => {
    // Text search filter
    const matchesSearch = Object.values(company).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    );
    
    // Category filter
    const matchesCategory = !filterCategory || company.category === filterCategory;
    
    // Industry filter
    const matchesIndustry = !filterIndustry || company.industryDepartment === filterIndustry;
    
    return matchesSearch && matchesCategory && matchesIndustry;
  });

  // Sort companies if sort field is selected
  const sortedCompanies = sortField 
    ? [...filteredCompanies].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (sortOrder === "ascend") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      })
    : filteredCompanies;

  // Reset all filters
  const handleResetFilters = () => {
    setSearchText("");
    setFilterCategory(null);
    setFilterIndustry(null);
    setSortField(null);
  };

  // Handle sort change
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle sort order if same field is clicked
      setSortOrder(sortOrder === "ascend" ? "descend" : "ascend");
    } else {
      // Set new sort field and default to ascending
      setSortField(field);
      setSortOrder("ascend");
    }
  };

  const columns = [
    { 
      title: "Company Name", 
      dataIndex: "companyName", 
      key: "companyName",
      sorter: true,
      sortOrder: sortField === "companyName" ? sortOrder : null,
    },
    { 
      title: "Industry", 
      dataIndex: "industryDepartment", 
      key: "industryDepartment",
      sorter: true,
      sortOrder: sortField === "industryDepartment" ? sortOrder : null,
    },
    { 
      title: "Category", 
      dataIndex: "category", 
      key: "category",
      sorter: true,
      sortOrder: sortField === "category" ? sortOrder : null,
    },
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

  // Sort menu items
  const sortMenu = (
    <Menu>
      <Menu.Item key="companyName" onClick={() => handleSort("companyName")}>
        Company Name {sortField === "companyName" ? (sortOrder === "ascend" ? "↑" : "↓") : ""}
      </Menu.Item>
      <Menu.Item key="industryDepartment" onClick={() => handleSort("industryDepartment")}>
        Industry {sortField === "industryDepartment" ? (sortOrder === "ascend" ? "↑" : "↓") : ""}
      </Menu.Item>
      <Menu.Item key="category" onClick={() => handleSort("category")}>
        Category {sortField === "category" ? (sortOrder === "ascend" ? "↑" : "↓") : ""}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-4">Company Data</h2>

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        {/* Global Search Box */}
        <Search
          placeholder="Search companies..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ width: 250 }}
        />

        {/* Filter by Category */}
        <Select
          placeholder="Filter by Category"
          allowClear
          style={{ width: 180 }}
          value={filterCategory}
          onChange={(value) => setFilterCategory(value)}
        >
          {uniqueCategories.map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>

        {/* Filter by Industry */}
        <Select
          placeholder="Filter by Industry"
          allowClear
          style={{ width: 180 }}
          value={filterIndustry}
          onChange={(value) => setFilterIndustry(value)}
        >
          {uniqueIndustries.map(industry => (
            <Option key={industry} value={industry}>{industry}</Option>
          ))}
        </Select>

        {/* Sort Dropdown */}
        <Dropdown overlay={sortMenu}>
          <Button>
            <Space>
              <SortAscendingOutlined />
              Sort
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        {/* Reset Filters Button */}
        <Button 
          type="default" 
          onClick={handleResetFilters}
          disabled={!searchText && !filterCategory && !filterIndustry && !sortField}
        >
          Reset Filters
        </Button>
      </div>

      {/* Filter indicators */}
      {(filterCategory || filterIndustry || sortField) && (
        <div className="mb-3 text-sm text-gray-600">
          <Space size="small" wrap>
            {filterCategory && (
              <span className="bg-blue-100 px-2 py-1 rounded-md">
                Category: {filterCategory} 
                <Button 
                  type="text" 
                  size="small" 
                  className="ml-1 text-xs" 
                  onClick={() => setFilterCategory(null)}
                >
                  ×
                </Button>
              </span>
            )}
            {filterIndustry && (
              <span className="bg-blue-100 px-2 py-1 rounded-md">
                Industry: {filterIndustry}
                <Button 
                  type="text" 
                  size="small" 
                  className="ml-1 text-xs" 
                  onClick={() => setFilterIndustry(null)}
                >
                  ×
                </Button>
              </span>
            )}
            {sortField && (
              <span className="bg-blue-100 px-2 py-1 rounded-md">
                Sorted by: {sortField} ({sortOrder === "ascend" ? "A-Z" : "Z-A"})
                <Button 
                  type="text" 
                  size="small" 
                  className="ml-1 text-xs" 
                  onClick={() => setSortField(null)}
                >
                  ×
                </Button>
              </span>
            )}
          </Space>
        </div>
      )}

      {/* Company Table */}
      <Table
        dataSource={sortedCompanies}
        columns={columns}
        rowKey="_id"
        loading={dataLoading}
        pagination={{ pageSize: 5 }}
        onChange={(pagination, filters, sorter) => {
          if (sorter.field) {
            setSortField(sorter.field);
            setSortOrder(sorter.order);
          }
        }}
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
