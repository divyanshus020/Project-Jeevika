import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Modal, Button, message, Descriptions, Input, Form } from "antd";
import { updateEmployee } from "../utils/api";

const { Content } = Layout;

const EmployeeDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(location.state?.user || null);
  const [loading, setLoading] = useState(!employee);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!employee) {
      const storedEmployee = localStorage.getItem("userData");
      if (storedEmployee) {
        setEmployee(JSON.parse(storedEmployee));
        setLoading(false);
      } else {
        message.error("Unauthorized access. Redirecting to login.");
        navigate("/");
      }
    }
  }, [employee, navigate]);

  const handleLogout = () => setLogoutModalVisible(true);

  const confirmLogout = () => {
    localStorage.clear();
    message.success("Logged out successfully!");
    navigate("/", { replace: true });
  };

  const handleOpenProfile = () => {
    setProfileModalVisible(true);
    setEditMode(false);
  };

  const handleEditProfile = () => {
    setEditMode(true);
    form.setFieldsValue(employee);
  };

  const handleSaveProfile = async () => {
    try {
      const values = await form.validateFields();
      const updatedEmployee = await updateEmployee(employee.id, values);
      setEmployee(updatedEmployee);
      localStorage.setItem("userData", JSON.stringify(updatedEmployee));
      message.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <Layout className="w-full h-[80vh] bg-gray-200">
      {/* Custom Navbar */}
      <div className="w-full bg-white p-4 flex justify-between items-center shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Employee Dashboard</h2>
        <div className="flex gap-4">
          <Button type="primary" onClick={handleOpenProfile}>Profile</Button>
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
              Welcome, {employee?.name || "Employee"}!
            </h1>
            <h2 className="text-xl font-semibold text-gray-700 mt-2">Role: EMPLOYEE</h2>
            <p className="text-gray-600 mt-2">This is your Employee Dashboard.</p>
          </div>
        )}
      </Content>

      {/* Profile Modal */}
      <Modal
        title="Employee Profile"
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
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Valid Email is required" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="mobileNumber" rules={[{ required: true, message: "Phone Number is required" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Experience" name="workExperience"><Input /></Form.Item>
            <Form.Item label="Job Role" name="jobRole"><Input /></Form.Item>
            <Form.Item label="Expected Salary" name="expectedSalary"><Input /></Form.Item>
          </Form>
        ) : employee ? (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">{employee.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{employee.mobile}</Descriptions.Item>
            <Descriptions.Item label="Experience">{employee.workExperience}</Descriptions.Item>
            <Descriptions.Item label="Job Role">{employee.jobRole}</Descriptions.Item>
            <Descriptions.Item label="Expected Salary">{employee.expectedSalary}</Descriptions.Item>
          </Descriptions>
        ) : (
          <p>No employee data found.</p>
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

export default EmployeeDashboard;
