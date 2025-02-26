import React, { useState } from 'react';

const AdminForm = () => {
  const [formData, setFormData] = useState({ adminUsername: '', adminPassword: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Success:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 border rounded-lg shadow-md w-full max-w-md bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Admin Username</label>
        <input 
          type="text" 
          name="adminUsername" 
          value={formData.adminUsername} 
          onChange={handleChange} 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          placeholder="Enter your admin username"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Admin Password</label>
        <input 
          type="password" 
          name="adminPassword" 
          value={formData.adminPassword} 
          onChange={handleChange} 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          placeholder="Enter your admin password"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-3 rounded-lg font-medium">
        Login
      </button>
    </form>
  );
};

export default AdminForm;
