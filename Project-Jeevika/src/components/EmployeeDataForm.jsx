import React from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import { submitEmployeeProfile } from '../utils/api';
import moment from 'moment';

const EmployeeDataForm = ({ onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        ...values,
        dob: values.dob ? moment(values.dob).format("YYYY-MM-DD") : null, // Convert DatePicker to string
      };
      await submitEmployeeProfile(formattedValues);
      message.success("Registration successful!");
      onClose();
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <Form 
      form={form} 
      onFinish={handleSubmit} 
      layout="vertical" 
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter your username!' }]}>
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}>
          <Input placeholder="Enter your email" />
        </Form.Item>
        
        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password!' }]}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item name="mobile" label="Mobile" rules={[{ required: true, message: 'Please enter your mobile number!' }]}>
          <Input placeholder="Enter your mobile number" />
        </Form.Item>

        <Form.Item name="dob" label="Date of Birth" rules={[{ required: true, message: 'Please select your date of birth!' }]}>
          <DatePicker className="w-full" />
        </Form.Item>
        
        <Form.Item name="address" label="Address">
          <Input placeholder="Enter your address" />
        </Form.Item>

        <Form.Item name="workExperience" label="Work Experience">
          <Input placeholder="Enter your work experience" />
        </Form.Item>
        
        <Form.Item name="expectedSalary" label="Expected Salary">
          <Input placeholder="Enter your expected salary" />
        </Form.Item>

        <Form.Item name="jobRole" label="Job Role">
          <Input placeholder="Enter your job role" />
        </Form.Item>

        <Form.Item name="pincode" label="Pincode">
          <Input placeholder="Enter your pincode" />
        </Form.Item>
      </div>

      <div className="flex justify-center mt-4">
        <Button type="primary" htmlType="submit" className="bg-blue-500 text-white py-2 px-6 rounded-md">
          Register
        </Button>
      </div>
    </Form>
  );
};  

export default EmployeeDataForm;
