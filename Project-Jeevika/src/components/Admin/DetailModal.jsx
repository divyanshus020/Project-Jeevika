import React from 'react';
import { Modal, Button, Descriptions } from 'antd';

const DetailModal = ({ 
  visible, 
  setVisible, 
  selectedEmployee, 
  selectedCompany,
  setSelectedEmployee,
  setSelectedCompany 
}) => {
  const handleClose = () => {
    setVisible(false);
    setSelectedEmployee(null);
    setSelectedCompany(null);
  };

  return (
    <>
      {/* Employee Details Modal */}
      <Modal
        title="Employee Details"
        open={visible && selectedEmployee}
        onCancel={handleClose}
        footer={<Button onClick={handleClose}>Close</Button>}
      >
        {selectedEmployee && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">{selectedEmployee.name}</Descriptions.Item>
            <Descriptions.Item label="Job Role">{selectedEmployee.jobRole}</Descriptions.Item>
            <Descriptions.Item label="Expected Salary">{selectedEmployee.expectedSalary}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedEmployee.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{selectedEmployee.mobile}</Descriptions.Item>
            <Descriptions.Item label="Experience">{selectedEmployee.workExperience}</Descriptions.Item>
            <Descriptions.Item label="DOB">{selectedEmployee.dob}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Company Details Modal */}
      <Modal
        title="Company Details"
        open={visible && selectedCompany}
        onCancel={handleClose}
        footer={<Button onClick={handleClose}>Close</Button>}
      >
        {selectedCompany && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Company Name">{selectedCompany.companyName}</Descriptions.Item>
            <Descriptions.Item label="Industry">{selectedCompany.industryDepartment}</Descriptions.Item>
            <Descriptions.Item label="Category">{selectedCompany.category}</Descriptions.Item>
            <Descriptions.Item label="Location">{selectedCompany.address}</Descriptions.Item>
            <Descriptions.Item label="Contact Email">{selectedCompany.email}</Descriptions.Item>
            <Descriptions.Item label="Contact Phone">{selectedCompany.mobileNumber}</Descriptions.Item>
            <Descriptions.Item label="Requirement">{selectedCompany.requirement}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default DetailModal;
