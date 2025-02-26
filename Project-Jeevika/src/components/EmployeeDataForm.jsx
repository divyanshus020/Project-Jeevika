import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';

const EmployeeDataForm = ({ onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Registration Success:', values);
    onClose();
  };

  return (
    <Form 
      form={form} 
      onFinish={handleSubmit} 
      layout="vertical" 
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Username */}
        <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter your username!' }]}>
          <Input placeholder="Enter your username" className="p-2 border rounded-md" />
        </Form.Item>

        {/* Email */}
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}>
          <Input placeholder="Enter your email" className="p-2 border rounded-md" />
        </Form.Item>
        
        {/* Password */}
        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password!' }]}>
          <Input.Password placeholder="Enter your password" className="p-2 border rounded-md" />
        </Form.Item>

        {/* Mobile */}
        <Form.Item name="mobile" label="Mobile" rules={[{ required: true, message: 'Please enter your mobile number!' }]}>
          <Input placeholder="Enter your mobile number" className="p-2 border rounded-md" />
        </Form.Item>

        {/* Date of Birth */}
        <Form.Item name="dob" label="Date of Birth" rules={[{ required: true, message: 'Please select your date of birth!' }]}>
          <DatePicker className="w-full p-2 border rounded-md" />
        </Form.Item>
        
        {/* Address */}
        <Form.Item name="address" label="Address">
          <Input placeholder="Enter your address" className="p-2 border rounded-md" />
        </Form.Item>

        {/* Work Experience */}
        <Form.Item name="workExperience" label="Work Experience">
          <Input placeholder="Enter your work experience" className="p-2 border rounded-md" />
        </Form.Item>
        
        {/* Expected Salary */}
        <Form.Item name="expectedSalary" label="Expected Salary">
          <Input placeholder="Enter your expected salary" className="p-2 border rounded-md" />
        </Form.Item>

        {/* Job Role */}
        <Form.Item name="jobRole" label="Job Role">
          <Input placeholder="Enter your job role" className="p-2 border rounded-md" />
        </Form.Item>

        {/* Pincode */}
        <Form.Item name="pincode" label="Pincode">
          <Input placeholder="Enter your pincode" className="p-2 border rounded-md" />
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

export default EmployeeDataForm;
