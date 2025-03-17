import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { registerTeamMember } from '../../utils/api'; // Ensure correct path

const CreateTeamModal = ({ visible, setVisible, fetchTeamMembers }) => {
  const [form] = Form.useForm();
  const handleCreateTeam = async (values) => {
    try {
      const response = await registerTeamMember(values);
      if (response?.data?.success) {
        message.success("Team member created successfully!");
        form.resetFields();
        setVisible(false);
        if (fetchTeamMembers) fetchTeamMembers(); // Refresh list if needed
      } else {
        message.error(response?.data?.message || "Failed to create team member.");
      }
    } catch (error) {
      console.error("Error creating team member:", error);
      message.error("An error occurred while creating the team member.");
    }
  };

  return (
    <Modal
      title="Create Team Member"
      open={visible}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <Form form={form} onFinish={handleCreateTeam} layout="vertical">
        <Form.Item
          label="Team Username"
          name="teamUserName"
          rules={[{ required: true, message: "Please enter the team username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter a password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mobile Number"
          name="mobileNumber"
          rules={[
            { required: true, message: "Please enter a mobile number!" },
            { pattern: /^[0-9]{10}$/, message: "Mobile number must be 10 digits!" },
          ]}
        >
          <Input maxLength={10} />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter the address!" }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item
          label="Pincode"
          name="pincode"
          rules={[
            { required: true, message: "Please enter the pincode!" },
            { pattern: /^[0-9]{6}$/, message: "Pincode must be 6 digits!" },
          ]}
        >
          <Input maxLength={6} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTeamModal;
