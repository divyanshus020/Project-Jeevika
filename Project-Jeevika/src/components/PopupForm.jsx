import React, { useState } from "react";
import { Modal, Button, Form, Select } from "antd";
import { MailOutlined, UserOutlined, SolutionOutlined, BankOutlined } from "@ant-design/icons";
import InputField from "./InputField"; // Importing the custom InputField component

const { Option } = Select;

const PopupForm = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [role, setRole] = useState("employee"); // Default role

  // Show Modal
  const showModal = () => {
    setVisible(true);
  };

  // Close Modal
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  // Handle Form Submit
  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      {/* Trigger Button */}
      <Button type="primary" onClick={showModal}>
        Open Form
      </Button>

      {/* Popup Form (Modal) */}
      <Modal
        title="User Form"
        open={visible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ role: "employee" }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <InputField label="Name" type="text" name="name" placeholder="Enter your name" icon={UserOutlined} />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <InputField label="Email" type="email" name="email" placeholder="Enter your email" icon={MailOutlined} />
          </Form.Item>

          <Form.Item
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <Select onChange={(value) => setRole(value)} className="w-full">
              <Option value="employee">Employee</Option>
              <Option value="hire">Hire</Option>
            </Select>
          </Form.Item>

          {/* Conditionally Render Fields Based on Role */}
          {role === "employee" && (
            <Form.Item
              name="jobTitle"
              rules={[{ required: true, message: "Please enter job title" }]}
            >
              <InputField label="Job Title" type="text" name="jobTitle" placeholder="Enter your job title" icon={SolutionOutlined} />
            </Form.Item>
          )}

          {role === "hire" && (
            <Form.Item
              name="companyName"
              rules={[{ required: true, message: "Please enter company name" }]}
            >
              <InputField label="Company Name" type="text" name="companyName" placeholder="Enter your company name" icon={BankOutlined} />
            </Form.Item>
          )}

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PopupForm;
