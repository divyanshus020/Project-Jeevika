import React, { useState } from 'react';
import { Modal, Button, Input, Form, message } from 'antd';
import { signInEmployee, forgetPassword } from '../utils/api'; // Import API functions
import EmployeeDataForm from '../pages/EmployeeRegister';
import { useNavigate } from 'react-router-dom'; // For navigation

const EmployeeForm = () => {
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const userType = localStorage.getItem('userType') || 'employee'; // Retrieve userType from localStorage
      const response = await signInEmployee({ ...values, userType });

      // Store authentication details securely
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.data));
      localStorage.setItem('role', 'employee'); // Store user role
      localStorage.setItem('userType', userType); // Store userType

      message.success('Login successful! Redirecting...');
      navigate('/EmployeeDashboard', { state: { user: response.data.data } });
    } catch (err) {
      message.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (values) => {
    setResetLoading(true);
    try {
      const userType = localStorage.getItem("userType") || "employee";
  
      // Make API call to request password reset
      const response = await forgetPassword({ email: values.email, userType });
  
      // Assuming the backend sends a reset token and user ID in response
      const { resetToken, userId } = response.data;
  
      // Store reset token temporarily (optional)
      localStorage.setItem("resetToken", resetToken);
      localStorage.setItem("resetUserId", userId);
  
      message.success("Password reset link sent to your email!");
      setIsForgotPasswordModalVisible(false);
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto ">
      <div className="p-8 border rounded-lg shadow-md w-full max-w-md bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Employee Login</h2>

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
        title="Register" 
        open={isRegisterModalVisible} 
        footer={null} 
        onCancel={() => setIsRegisterModalVisible(false)}
      >
        <EmployeeDataForm onClose={() => setIsRegisterModalVisible(false)} />
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

export default EmployeeForm;
