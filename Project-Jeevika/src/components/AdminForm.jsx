import React, { useState } from 'react';
import { Modal, Button, Input, Form, message } from 'antd';
import { signInTeamMember, forgetPassword } from '../utils/api'; // Import API functions
import { useNavigate } from 'react-router-dom'; // For navigation

const AdminForm = () => {
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const userType = 'admin'; // Set user type explicitly
      const response = await signInTeamMember({ ...values, userType });

      // Store authentication details securely
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('adminData', JSON.stringify(response.data.data));
      sessionStorage.setItem('role', 'admin');
      sessionStorage.setItem('userType', userType); // Store userType

      message.success('Login successful! Redirecting...');
      navigate('/AdminDashboard', { state: { admin: response.data.data } });
    } catch (err) {
      message.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (values) => {
    setResetLoading(true);
    try {
      await forgetPassword({ email: values.email, userType: 'admin' });

      message.success('Password reset link sent to your email!');
      setIsForgotPasswordModalVisible(false);
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to send reset link');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto">
      <div className="p-8 border rounded-lg shadow-md w-full max-w-md bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Admin Username"
            name="email"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input placeholder="Enter your admin username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Enter your admin password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            Login
          </Button>
        </Form>

        <div className="text-center mt-4">
          <Button type="link" onClick={() => setIsForgotPasswordModalVisible(true)}>
            Forgot Password?
          </Button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        title="Reset Password"
        open={isForgotPasswordModalVisible}
        footer={null}
        onCancel={() => setIsForgotPasswordModalVisible(false)}
      >
        <Form onFinish={handlePasswordReset} layout="vertical">
          <Form.Item
            label="Enter your email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email format' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full" loading={resetLoading}>
            Send Reset Link
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminForm;
