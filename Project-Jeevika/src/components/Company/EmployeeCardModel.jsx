import React from 'react';
import { Modal, Descriptions, Button } from 'antd';

const EmployeeProfileModal = ({ employee, visible, onClose }) => {
  return (
    <Modal
      title="Employee Profile"
      open={visible}
      onCancel={onClose}
      footer={<Button onClick={onClose}>Close</Button>}
    >
      {employee ? (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Name">{employee.name}</Descriptions.Item>
          <Descriptions.Item label="Job Role">{employee.jobRole}</Descriptions.Item>
          <Descriptions.Item label="Experience">{employee.workExperience}</Descriptions.Item>
          <Descriptions.Item label="DOB">{employee.dob}</Descriptions.Item>
          <Descriptions.Item label="Expected Salary">{employee.expectedSalary}</Descriptions.Item>
        </Descriptions>
      ) : (
        <p>No employee selected.</p>
      )}
    </Modal>
  );
};

export default EmployeeProfileModal;