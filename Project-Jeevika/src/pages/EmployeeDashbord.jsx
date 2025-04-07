import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Modal, Button, message, Descriptions, Input, Form, Space } from "antd";
import { updateEmployee, changePassword } from "../utils/api";

const { Content } = Layout;

const EmployeeDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(location.state?.user || null);
  const [loading, setLoading] = useState(!employee);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (!employee) {
      const storedEmployee = sessionStorage.getItem("userData");
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
    sessionStorage.clear();
    message.success("Logged out successfully!");
    navigate("/", { replace: true });
  };

  const handleOpenProfile = () => {
    setProfileModalVisible(true);
    setEditMode(false);
    setShowPasswordForm(false);
  };

  const handleEditProfile = () => {
    setEditMode(true);
    setShowPasswordForm(false);
    // Map the employee data to match form field names
    form.setFieldsValue({
      name: employee.name,
      email: employee.email,
      mobileNumber: employee.mobile,
      workExperience: employee.workExperience,
      jobRole: employee.jobRole,
      expectedSalary: employee.expectedSalary
    });
  };

  const handleSaveProfile = async () => {
    try {
      setSubmitLoading(true);
      const values = await form.validateFields();
      
      // Convert form values to match the employee object structure
      const updatedData = {
        ...values,
        mobile: values.mobileNumber, // Convert back to the structure expected by the API
        userType: "employee" // Ensure userType is included
      };
      
      const response = await updateEmployee(employee.id, updatedData);
      
      if (response) {
        // Create a fully merged object with all previous data plus updates
        const updatedEmployee = {
          ...employee,
          ...updatedData,
          mobile: updatedData.mobileNumber // Ensure the display property is updated too
        };
        
        setEmployee(updatedEmployee);
        sessionStorage.setItem("userData", JSON.stringify(updatedEmployee));
        message.success("Profile updated successfully!");
        setEditMode(false);
      } else {
        message.error(response?.message || "Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error(error?.response?.data?.message || "An error occurred while updating profile");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleResetPassword = async (values) => {
    try {
      setSubmitLoading(true);
      
      if (!employee || !employee.id) {
        message.error("Employee data not found. Please login again.");
        return;
      }
      
      const postData = { 
        ...values, 
        userType: "employee", 
        id: employee.id 
      };

      const response = await changePassword(postData);
      
      if (response && response.success) {
        message.success("Password changed successfully!");
        setShowPasswordForm(false);
        form.resetFields();
      } else {
        message.error(response?.message || "Failed to change password. Please try again.");
      }
    } catch (error) {
      console.error("Password change error:", error);
      message.error(error?.response?.data?.message || "An error occurred while changing password");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCloseModal = () => {
    setProfileModalVisible(false);
    setEditMode(false);
    setShowPasswordForm(false);
    form.resetFields();
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
        onCancel={handleCloseModal}
        footer={editMode ? (
          <>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
            <Button type="primary" onClick={handleSaveProfile} loading={submitLoading}>Save Changes</Button>
          </>
        ) : showPasswordForm ? null : (
          <Space>
            <Button type="primary" onClick={handleEditProfile}>Edit Profile</Button>
            <Button onClick={() => setShowPasswordForm(true)}>Change Password</Button>
            <Button danger onClick={handleLogout}>Logout</Button>
          </Space>
        )}
        width={600}
      >
        {showPasswordForm ? (
          <Form form={form} layout="vertical" onFinish={handleResetPassword}>
            <Form.Item
              name="currentPassword"
              label="Old Password"
              rules={[
                { required: true, message: 'Please enter your old password' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
            >
              <Input.Password placeholder="Enter old password" />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: 'Please enter your new password' },
                { min: 6, message: 'Password must be at least 6 characters' },
                { 
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message: 'Password must contain uppercase, lowercase, number and special character'
                }
              ]}
            >
              <Input.Password placeholder="Enter new password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your new password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm new password" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={submitLoading}>
                  Submit
                </Button>
                <Button onClick={() => setShowPasswordForm(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        ) : editMode ? (
          <Form form={form} layout="vertical">
            <Form.Item 
              name="name" 
              label="Name" 
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item 
              name="email" 
              label="Email" 
              rules={[{ required: true, type: "email", message: "Valid Email is required" }]}
            >
              <Input placeholder="Enter your email" disabled />
            </Form.Item>
            <Form.Item 
              name="mobileNumber" 
              label="Phone" 
              rules={[
                { required: true, message: "Phone Number is required" },
                { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number' }
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>
            <Form.Item 
              name="workExperience" 
              label="Experience"
              rules={[{ required: true, message: "Work experience is required" }]}
            >
              <Input placeholder="Enter your work experience" />
            </Form.Item>
            <Form.Item 
              name="jobRole" 
              label="Job Role"
              rules={[{ required: true, message: "Job role is required" }]}
            >
              <Input placeholder="Enter your job role" />
            </Form.Item>
            <Form.Item 
              name="expectedSalary" 
              label="Expected Salary"
              rules={[{ required: true, message: "Expected salary is required" }]}
            >
              <Input placeholder="Enter your expected salary" />
            </Form.Item>
          </Form>
        ) : employee ? (
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="Name">{employee.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{employee.mobile}</Descriptions.Item>
            <Descriptions.Item label="Experience">{employee.workExperience}</Descriptions.Item>
            <Descriptions.Item label="Job Role">{employee.jobRole}</Descriptions.Item>
            <Descriptions.Item label="Expected Salary">{employee.expectedSalary}</Descriptions.Item>
          </Descriptions>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>No employee data found. Please refresh or login again.</p>
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
    </Layout>
  );
};

export default EmployeeDashboard;