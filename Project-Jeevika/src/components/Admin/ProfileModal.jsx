import React, { useState } from 'react';
import { Modal, Button, Descriptions, Space } from 'antd';
import ResetPassword from '../ResetPass';

const ProfileModal = ({ visible, setVisible, admin, onResetPassword }) => {
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);

  const handleResetPasswordSuccess = () => {
    // You can add any additional logic here after password reset
    if (onResetPassword) {
      onResetPassword(admin._doc?._id);
    }
  };

  return (
    <>
      <Modal
        title="Admin Profile"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={
          <Space>
            {admin && (
              <Button 
                type="primary" 
                onClick={() => setResetPasswordVisible(true)}
              >
                Reset Password
              </Button>
            )}
            <Button onClick={() => setVisible(false)}>Close</Button>
          </Space>
        }
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

      {admin && (
        <ResetPassword
          visible={resetPasswordVisible}
          setVisible={setResetPasswordVisible}
          adminId={admin._doc?._id}
          onSuccess={handleResetPasswordSuccess}
        />
      )}
    </>
  );
};

export default ProfileModal;
