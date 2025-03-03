import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Modal, Button, message, Descriptions, Input, Form } from "antd";
import { updateCompany } from "../utils/api";

const { Content } = Layout;

const CompanyDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [company, setCompany] = useState(location.state?.company || null);
  const [loading, setLoading] = useState(!company);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!company) {
      const storedCompany = localStorage.getItem("companyData");
      if (storedCompany) {
        setCompany(JSON.parse(storedCompany));
        setLoading(false);
      } else {
        message.error("Unauthorized access. Redirecting to login.");
        navigate("/");
      }
    }
  }, [company, navigate]);

  const handleLogout = () => setLogoutModalVisible(true);

  const confirmLogout = () => {
    localStorage.removeItem("companyData");
    localStorage.removeItem("token");
    message.success("Logged out successfully!");
    navigate("/");
  };

  const handleOpenProfile = () => {
    setProfileModalVisible(true);
    setEditMode(false);
  };

  const handleEditProfile = () => {
    setEditMode(true);
    form.setFieldsValue(company);
  };

  const handleSaveProfile = async () => {
    try {
      const values = await form.validateFields();
      const updatedCompany = await updateCompany(company.id, values);
      setCompany(updatedCompany);
      localStorage.setItem("companyData", JSON.stringify(updatedCompany));
      message.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <Layout className="w-full h-[80vh] bg-gray-200">
      {/* Responsive Navbar */}
      <div className="w-full bg-white p-4 flex flex-wrap justify-between items-center shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Company Dashboard</h2>
        <div className="flex flex-wrap gap-4">
          <Button type="primary" onClick={handleOpenProfile}>Profile</Button>
          <Button type="default" className="border border-gray-400" onClick={() => navigate("/company/employee-card")}>
            Employee Card
          </Button>
          <Button danger onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      {/* Main Content */}
      <Content className="flex flex-col justify-center items-center w-full min-h-[80vh] px-4 text-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {company?.companyName || "Company"}!
            </h1>
            <h2 className="text-xl font-semibold text-gray-700 mt-2">Role: COMPANY</h2>
            <p className="text-gray-600 mt-2">This is your Company Dashboard.</p>
          </div>
        )}
      </Content>

      {/* Profile Modal */}
      <Modal
        title="Company Profile"
        open={profileModalVisible}
        onCancel={() => setProfileModalVisible(false)}
        footer={editMode ? (
          <>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
            <Button type="primary" onClick={handleSaveProfile}>Save Changes</Button>
          </>
        ) : (
          <Button type="primary" onClick={handleEditProfile}>Edit Profile</Button>
        )}
      >
        {editMode ? (
          <Form form={form} layout="vertical">
            <Form.Item label="Company Name" name="companyName" rules={[{ required: true, message: "Company Name is required" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Valid Email is required" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="mobileNumber" rules={[{ required: true, message: "Phone Number is required" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Address" name="address"><Input /></Form.Item>
            <Form.Item label="Industry" name="industryDepartment"><Input /></Form.Item>
            <Form.Item label="Category" name="category"><Input /></Form.Item>
            <Form.Item label="Requirement" name="requirement"><Input /></Form.Item>
          </Form>
        ) : company ? (
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
    </Layout>
  );
};

export default CompanyDashboard;
