import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import CompanyDataForm from './CompanyDataForm';

const CompanyForm = () => {
  const [formData, setFormData] = useState({ companyUsername: '', companyPassword: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Success:', formData);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <form onSubmit={handleSubmit} className="p-8 border rounded-lg shadow-md w-full max-w-md bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Company Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Company Username</label>
          <Input 
            type="text" 
            name="companyUsername" 
            value={formData.companyUsername} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            placeholder="Enter your company username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <Input.Password 
            name="companyPassword" 
            value={formData.companyPassword} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            placeholder="Enter your password"
            required
          />
        </div>
        <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-3 rounded-lg font-medium">
          Login
        </Button>
        <p className="text-center mt-4">
          Don't have an account? 
          <Button type="link" onClick={() => setIsModalVisible(true)}>
            Register here
          </Button>
        </p>
      </form>

      {/* Registration Popup */}
      <Modal title="Company Registration" open={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
        <CompanyDataForm onClose={() => setIsModalVisible(false)} />
      </Modal>
    </div>
  );
};

export default CompanyForm;
