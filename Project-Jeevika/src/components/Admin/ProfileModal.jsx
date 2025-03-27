import React, { useState } from 'react';
import { Modal, Button, Descriptions, Space, Form, Input } from 'antd';
import { changePassword } from '../../utils/api';

const ProfileModal = ({ visible, setVisible, admin}) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [form] = Form.useForm();

  const handleResetPassword =async(values) => {
    try {
      const adminData =JSON.parse(sessionStorage.getItem("adminData"));
      const postData = {...values,userType:"team",id:adminData.id}

     const response = await changePassword(postData);
      console.log(response)
    } catch (error) {
      console.log(error);
    }

    setShowPasswordForm(false);
    form.resetFields();
  };
  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
    if (!showPasswordForm) {
      form.resetFields();
    }
  };

  return (
    <Modal
      title="Admin Profile"
      open={visible}
      onCancel={() => {
        setVisible(false);
        setShowPasswordForm(false);
        form.resetFields();
      }}
      footer={
        <Space>
          {admin && !showPasswordForm && (
            <Button type="primary" onClick={togglePasswordForm}>
              Reset Password
            </Button>
          )}
          <Button onClick={() => setVisible(false)}>Close</Button>
        </Space>
      }
    >
      {showPasswordForm ? (
        <Form form={form} layout="vertical" onFinish={handleResetPassword}>
          <Form.Item
            name="currentPassword"
            label="Old Password"
            rules={[{ required: true, message: 'Please enter your old password' }]}
          >
            <Input.Password placeholder="Enter old password" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: 'Please enter your new password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={togglePasswordForm}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      ) : (
        admin ? (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Admin Username">{admin?._doc?.teamUserName}</Descriptions.Item>
            <Descriptions.Item label="Email">{admin._doc?.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{admin._doc?.mobileNumber}</Descriptions.Item>
          </Descriptions>
        ) : (
          <p>No admin data found.</p>
        )
      )}
    </Modal>
  );
};

export default ProfileModal;
