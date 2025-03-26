import React, { useState } from "react";
import { Modal, Input, Button, Form } from "antd";

const ResetPass = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    // Simulate API call (Replace this with actual API integration)
    setTimeout(() => {
      console.log("Password Reset Data:", values);
      setLoading(false);
      onClose(); // Close modal after submission
    }, 1500);
  };

  return (
    <Modal
      title="Reset Password"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form layout="vertical" onFinish={handleSubmit}>
        {/* Old Password */}
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[{ required: true, message: "Please enter your old password!" }]}
        >
          <Input.Password placeholder="Enter Old Password" />
        </Form.Item>

        {/* New Password */}
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: "Please enter a new password!" }]}
        >
          <Input.Password placeholder="Enter New Password" />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm New Password" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResetPass;
