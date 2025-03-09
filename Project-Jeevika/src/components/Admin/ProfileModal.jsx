import React from 'react';
import { Modal, Button, Descriptions } from 'antd';

const ProfileModal = ({ visible, setVisible, admin }) => {
  return (
    <Modal
      title="Admin Profile"
      open={visible}
      onCancel={() => setVisible(false)}
      footer={<Button onClick={() => setVisible(false)}>Close</Button>}
    >
      {admin ? (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Admin Username">{admin?._doc?.teamUserName}</Descriptions.Item>
          <Descriptions.Item label="Email">{admin._doc?.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{admin._doc?.mobileNumber}</Descriptions.Item>
        </Descriptions>
      ) : (
        <p>No admin data found.</p>
      )}
    </Modal>
  );
};

export default ProfileModal;
