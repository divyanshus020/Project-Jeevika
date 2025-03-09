import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const CreateTeamModal = ({ visible, setVisible, form, handleCreateTeam }) => {
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
          rules={[{ required: true, message: "Please input the team username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Please input a valid email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input the password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mobile Number"
          name="mobileNumber"
          rules={[
            { required: true, message: "Please input the mobile number!" },
            { pattern: /^[0-9]+$/, message: "Mobile number must be numeric!" },
          ]}
        >
          <Input maxLength={10} />
        </Form.Item>

        <Form.Item
          label="Pincode"
          name="pincode"
          rules={[
            { required: true, message: "Please input the pincode!" },
            { pattern: /^[0-9]+$/, message: "Pincode must be numeric!" },
          ]}
        >
          <Input maxLength={6} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTeamModal;
