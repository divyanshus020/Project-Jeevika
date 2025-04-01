import React, { useState } from 'react';
import { Modal, Descriptions, Button, Space, Form, Input, message, Select } from 'antd';
import { changePassword, updateCompany } from '../../utils/api';

const CompanyProfileModal = ({ company, visible, onClose }) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleEditProfile = () => {
    setEditMode(true);
    form.setFieldsValue(company);
  };

  const handleSaveProfile = async () => {
    try {
      const values = await form.validateFields();
      const companyData = JSON.parse(sessionStorage.getItem("companyData"));
  
      if (!companyData || !companyData.id) {
        message.error("Company data not found. Please login again.");
        return;
      }

      const updateData = { 
        ...values, 
        userType: "company"  // Ensure userType is included
      };
    
      setLoading(true);
  
      const response = await updateCompany(companyData.id, updateData);
      console.log("API Response:", response);
  
      if (response) {
        // Create a fully merged object with all previous data plus updates
        const updatedCompanyData = { 
          ...companyData, 
          ...values 
        };
        
        // Update session storage
        sessionStorage.setItem("companyData", JSON.stringify(updatedCompanyData));
        
        message.success("Profile updated successfully!");
        setEditMode(false);
        
        console.log("About to call onClose with:", updatedCompanyData);
        // Pass the updated data back to parent component
        onClose(updatedCompanyData);
      } else {
        message.error(response?.message || "Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      message.error(error?.response?.data?.message || "An error occurred while updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (values) => {
    try {
      setLoading(true);
      const companyData = JSON.parse(sessionStorage.getItem("companyData"));
      
      if (!companyData || !companyData.id) {
        message.error("Company data not found. Please login again.");
        return;
      }
      
      const postData = { ...values, userType: "company", id: companyData.id };

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
      setLoading(false);
    }
  };

  const handleLogout = () => setLogoutModalVisible(true);

  const confirmLogout = () => {
    sessionStorage.clear();
    message.success("Logged out successfully!");
    // Assuming you have a navigation method or will pass this from parent
    window.location.href = "/";
  };

  return (
    <>
      <Modal
        title="Company Profile"
        open={visible}
        onCancel={() => {
          onClose();
          setEditMode(false);
          setShowPasswordForm(false);
        }}
        footer={editMode ? (
          <>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
            <Button type="primary" onClick={handleSaveProfile} loading={loading}>Save Changes</Button>
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
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
                <Button onClick={() => setShowPasswordForm(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        ) : editMode ? (
          <Form form={form} layout="vertical">
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[{ required: true, message: 'Please enter company name' }]}
            >
              <Input placeholder="Enter company name" disabled />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="Enter email" disabled />
            </Form.Item>
            <Form.Item
              name="mobileNumber"
              label="Phone"
              rules={[
                { required: true, message: 'Please enter phone number' },
                { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number' }
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <Input.TextArea placeholder="Enter address" rows={3} />
            </Form.Item>
            <Form.Item
              name="industryDepartment"
              label="Industry"
              rules={[{ required: true, message: 'Please select industry' }]}
            >
              <Select placeholder="Select industry">
                <Select.Option value="IT">IT</Select.Option>
                <Select.Option value="Manufacturing">Manufacturing</Select.Option>
                <Select.Option value="Retail">Retail</Select.Option>
                <Select.Option value="Healthcare">Healthcare</Select.Option>
                <Select.Option value="Education">Education</Select.Option>
                <Select.Option value="Agriculture">Agriculture</Select.Option>
                <Select.Option value="Finance">Finance</Select.Option>
                <Select.Option value="Construction">Construction</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please enter category' }]}
            >
              <Input placeholder="Enter category" />
            </Form.Item>
            <Form.Item
              name="requirement"
              label="Requirement"
              rules={[{ required: true, message: 'Please enter requirement' }]}
            >
              <Input.TextArea placeholder="Enter requirement" rows={3} />
            </Form.Item>
          </Form>
        ) : company ? (
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="Company Name">{company.companyName}</Descriptions.Item>
            <Descriptions.Item label="Email">{company.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{company.mobileNumber}</Descriptions.Item>
            <Descriptions.Item label="Address">{company.address}</Descriptions.Item>
            <Descriptions.Item label="Industry">{company.industryDepartment}</Descriptions.Item>
            <Descriptions.Item label="Category">{company.category}</Descriptions.Item>
            <Descriptions.Item label="Requirement">{company.requirement}</Descriptions.Item>
          </Descriptions>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>No company data found. Please refresh or login again.</p>
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
    </>
  );
};

export default CompanyProfileModal;