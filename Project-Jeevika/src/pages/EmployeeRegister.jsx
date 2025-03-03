import React from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import moment from 'moment';
import { registerEmployee } from '../utils/api'; // Import the registerEmployee function

const EmployeeRegister = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        name: values.username, // Assuming username is the name
        email: values.email,
        password: values.password, // You may want to hash this on the server side
        mobile: Number(values.mobile), // Ensure mobile is a number
        address: values.address,
        workExperience: values.workExperience,
        expectedSalary: Number(values.expectedSalary), // Ensure expectedSalary is a number
        jobRole: values.jobRole,
        pincode: Number(values.pincode), // Ensure pincode is a number
        dob: values.dob ? moment(values.dob).format("YYYY-MM-DD") : null, // Convert DatePicker to string
      };
      
      // Call the API to register the employee
      await registerEmployee(formattedValues);
      message.success("Registration successful!");
      form.resetFields(); // Reset the form fields after successful submission
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Employee Registration</h2>
      <Form 
        form={form} 
        onFinish={handleSubmit} 
        layout="vertical" 
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item 
            name="username" 
            label="Name" // Changed label to "Name"
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item 
            name="email" 
            label="Email" 
            rules={[
              { required: true, type: 'email', message: 'Please enter a valid email!' },
              { type: 'email', message: 'Email must be unique!' } // This is a placeholder; uniqueness should be handled on the server side
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          
          <Form.Item 
            name="password" 
            label="Password" 
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item 
            name="mobile" 
            label="Mobile" 
            rules={[{ required: true, message: 'Please enter your mobile number!' }]}
          >
            <Input type="number" placeholder="Enter your mobile number" />
          </Form.Item>

          <Form.Item 
            name="dob" 
            label="Date of Birth" 
            rules={[{ required: true, message: 'Please select your date of birth!' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          
          <Form.Item 
            name="address" 
            label="Address"
            rules={[{ required: true, message: 'Please enter your address!' }]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>

          <Form.Item 
            name="workExperience" 
            label="Work Experience"
            rules={[{ required: true, message: 'Please enter your work experience!' }]}
          >
            <Input placeholder="Enter your work experience" />
          </Form.Item>
          
          <Form.Item 
            name="expectedSalary" 
            label="Expected Salary"
            rules={[{ required: true, message: 'Please enter your expected salary!' }]}
          >
            <Input type="number" placeholder="Enter your expected salary" />
          </Form.Item>

          <Form.Item 
            name="jobRole" 
            label="Job Role"
            rules={[{ required: true, message: 'Please enter your job role!' }]}
          >
            <Input placeholder="Enter your job role" />
          </Form.Item>

          <Form.Item 
            name="pincode" 
            label="Pincode"
            rules={[{ required: true, message: 'Please enter your pincode!' }]}
          >
            <Input type="number" placeholder="Enter your pincode" />
          </Form.Item>
        </div>

        <div className="flex justify-center mt-4">
          <Button 
            type="primary" 
            htmlType="submit" 
            className="bg-blue-500 text-white py-2 px-6 rounded-md"
          >
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
};  

export default EmployeeRegister;