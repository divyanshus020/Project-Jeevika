import React, { useState } from 'react';
import { Modal, Button, Input, Form, message } from 'antd';
import { signInCompany, forgetPassword } from '../utils/api'; // Import API functions
import CompanyDataForm from '../pages/CompanyRegsiter'; // Import Company Register Form
import { useNavigate } from 'react-router-dom'; // For navigation

const CompanyForm = () => {
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const userType = sessionStorage.getItem('userType') || 'company'; // Retrieve userType from sessionStorage
      const response = await signInCompany({ ...values, userType });

      // Store authentication details securely
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('companyData', JSON.stringify(response.data.data));
      sessionStorage.setItem('role', 'company'); // Store user role
      sessionStorage.setItem('userType', userType); // Store userType

      message.success('Login successful! Redirecting...');
      navigate('/CompanyDashboard', { state: { company: response.data.data } });
    } catch (err) {
      message.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (values) => {
    setResetLoading(true);
    try {
      const userType = sessionStorage.getItem('userType') || 'company'; // Retrieve userType from sessionStorage
      await forgetPassword({ email: values.email, userType });

      message.success('Password reset link sent to your email!');
      setIsForgotPasswordModalVisible(false);
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to send reset link');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto ">
      <div className="p-8 border rounded-lg shadow-md w-full max-w-md bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Company Login</h2>

        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email format' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Enter your password" />
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

        <p className="text-center mt-2">
          Don't have an account?
          <Button type="link" onClick={() => setIsRegisterModalVisible(true)}>Register here</Button>
        </p>
      </div>

      {/* Registration Modal */}
      <Modal 
        title="Company Registration" 
        open={isRegisterModalVisible} 
        footer={null} 
        onCancel={() => setIsRegisterModalVisible(false)}
      >
        <CompanyDataForm onClose={() => setIsRegisterModalVisible(false)} />
      </Modal>

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

export default CompanyForm;
