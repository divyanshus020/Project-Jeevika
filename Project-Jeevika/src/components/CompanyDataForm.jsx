import React from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';

const { Option } = Select;

const CompanyDataForm = ({ onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Company Registration Success:', values);
    onClose();
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Company Username */}
        <Form.Item name="companyUsername" label="Company Username" rules={[{ required: true, message: 'Please enter your company username!' }]}>
          <Input placeholder="Enter company username" className="p-2 border rounded-md" />
        </Form.Item>

        {/* Company Email */}
        <Form.Item name="companyEmail" label="Company Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}>
          <Input placeholder="Enter company email" className="p-2 border rounded-md" />
        </Form.Item>

        {/* Company Password */}
        <Form.Item name="companyPassword" label="Password" rules={[{ required: true, message: 'Please enter a password!' }]}>
          <Input.Password placeholder="Enter password" className="p-2 border rounded-md" />
        </Form.Item>

        {/* Industry Department */}
        <Form.Item name="industryDepartment" label="Industry Department" rules={[{ required: true, message: 'Please enter the industry department!' }]}>
          <Input placeholder="Enter industry department" className="p-2 border rounded-md" />
        </Form.Item>

        {/* Date of Founded */}
        <Form.Item name="dateFounded" label="Date Founded" rules={[{ required: true, message: 'Please select a founding date!' }]}>
          <DatePicker className="w-full p-2 border rounded-md" />
        </Form.Item>

        {/* Category */}
        <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category!' }]}>
          <Select placeholder="Select a category" className="p-2 border rounded-md">
            <Option value="IT">IT</Option>
            <Option value="Manufacturing">Manufacturing</Option>
            <Option value="Finance">Finance</Option>
            <Option value="Healthcare">Healthcare</Option>
          </Select>
        </Form.Item>

        {/* Address */}
        <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter the company address!' }]}>
          <Input placeholder="Enter company address" className="p-2 border rounded-md" />
        </Form.Item>

        {/* Pincode */}
        <Form.Item name="pincode" label="Pincode" rules={[{ required: true, message: 'Please enter the pincode!' }]}>
          <Input placeholder="Enter pincode" className="p-2 border rounded-md" />
        </Form.Item>

        {/* Mobile Number */}
        <Form.Item name="mobileNumber" label="Mobile Number" rules={[{ required: true, message: 'Please enter a mobile number!' }]}>
          <Input placeholder="Enter mobile number" className="p-2 border rounded-md" />
        </Form.Item>

        {/* Requirement */}
        <Form.Item name="requirement" label="Requirement">
          <Input.TextArea rows={3} placeholder="Enter requirements" className="p-2 border rounded-md" />
        </Form.Item>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md">
          Register
        </Button>
      </div>
    </Form>
  );
};

export default CompanyDataForm;
