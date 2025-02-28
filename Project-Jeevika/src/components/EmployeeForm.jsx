import React, { useState } from 'react';
import { Modal, Button, Input, Form, message } from 'antd';
import { loginUser } from '../utils/api'; // Import API function
import EmployeeDataForm from './EmployeeDataForm';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser(formData);
      localStorage.setItem("token", data.token); // Store token
      message.success("Login successful!");
      window.location.href = "/dashboard"; // Redirect to dashboard
    } catch (error) {
      message.error(error.response?.data?.message || "Login failed!");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto py-10">
      <form onSubmit={handleSubmit} className="p-8 border rounded-lg shadow-md w-full max-w-md bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Username</label>
          <Input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-lg"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <Input.Password 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-lg"
            placeholder="Enter your password"
            required
          />
        </div>
        <Button type="primary" htmlType="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium" loading={loading}>
          Login
        </Button>
        <p className="text-center mt-4">
          Don't have an account? 
          <Button type="link" onClick={() => setIsModalVisible(true)}>
            Register here
          </Button>
        </p>
      </form>
      <Modal title="Register" open={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
        <EmployeeDataForm onClose={() => setIsModalVisible(false)} />
      </Modal>
    </div>
  );
};

export default EmployeeForm;
