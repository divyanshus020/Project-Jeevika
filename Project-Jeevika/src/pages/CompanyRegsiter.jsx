import React from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import moment from 'moment';
import { registerCompany } from '../utils/api'; // API function for company registration

const CompanyRegister = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        companyName: values.companyName,
        email: values.email,
        password: values.password, // Hashed on the server
        industryDepartment: values.industryDepartment,
        workExperience: values.workExperience,
        foundedDate: values.foundedDate ? moment(values.foundedDate).format("YYYY-MM-DD") : null,
        category: values.category,
        address: values.address,
        pincode: Number(values.pincode),
        mobileNumber: Number(values.mobileNumber),
        requirement: values.requirement,
      };

      // Call API for registration
      await registerCompany(formattedValues);
      message.success("Company registered successfully!");
      form.resetFields(); // Reset form after success
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Company Registration</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item name="companyName" label="Company Name" rules={[{ required: true, message: 'Enter company name!' }]}>
            <Input placeholder="Enter company name" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Enter a valid email!' }]}>
            <Input placeholder="Enter company email" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Enter password!' }]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item name="industryDepartment" label="Industry Department" rules={[{ required: true, message: 'Enter industry department!' }]}>
            <Input placeholder="Enter industry department" />
          </Form.Item>

          <Form.Item name="workExperience" label="Work Experience" rules={[{ required: true, message: 'Enter work experience!' }]}>
            <Input placeholder="Enter work experience" />
          </Form.Item>

          <Form.Item name="foundedDate" label="Founded Date" rules={[{ required: true, message: 'Select founded date!' }]}>
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Enter category!' }]}>
            <Input placeholder="Enter category" />
          </Form.Item>

          <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Enter address!' }]}>
            <Input placeholder="Enter company address" />
          </Form.Item>

          <Form.Item name="pincode" label="Pincode" rules={[{ required: true, message: 'Enter pincode!' }]}>
            <Input type="number" placeholder="Enter pincode" />
          </Form.Item>

          <Form.Item name="mobileNumber" label="Mobile Number" rules={[{ required: true, message: 'Enter mobile number!' }]}>
            <Input type="number" placeholder="Enter mobile number" />
          </Form.Item>

          <Form.Item name="requirement" label="Requirement" rules={[{ required: true, message: 'Enter company requirements!' }]}>
            <Input.TextArea placeholder="Enter requirements" />
          </Form.Item>
        </div>

        <div className="flex justify-center mt-4">
          <Button type="primary" htmlType="submit" className="bg-blue-500 text-white py-2 px-6 rounded-md">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CompanyRegister;
