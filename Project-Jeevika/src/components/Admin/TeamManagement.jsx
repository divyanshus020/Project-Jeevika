import React, { useState } from 'react';
import { Form } from 'antd';
import CreateTeamModal from './CreateTeamModal';
import { registerTeamMember } from '../api/api';

const TeamManagement = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const handleCreateTeam = async (values) => {
    try {
      // Call the API to register team member
      const response = await registerTeamMember(values);
      
      // Handle successful registration
      message.success('Team member registered successfully');
      
      // Close the modal
      setVisible(false);
      
      // Reset the form
      form.resetFields();
    } catch (error) {
      // Handle registration error
      message.error('Failed to register team member');
    }
  };

  return (
    <div>
      <CreateTeamModal 
        visible={visible}
        setVisible={setVisible}
        form={form}
        handleCreateTeam={handleCreateTeam}
      />
      {/* Other components */}
    </div>
  );
};

export default TeamManagement;
