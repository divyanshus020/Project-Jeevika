import React, { useState } from 'react';
import { Button } from 'antd';
import EmployeeForm from '../components/EmployeeForm';
import CompanyForm from '../components/CompanyForm';
import AdminForm from '../components/AdminForm';

const LoginPage = () => {
  const [role, setRole] = useState('employee');

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="border rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">HEY THERE!</h1>
        
        {/* Navbar for role selection */}
        <div className="flex justify-around mb-4 border-b pb-2">
          <Button type={role === 'employee' ? 'primary' : 'default'} onClick={() => setRole('employee')}>Employee</Button>
          <Button type={role === 'company' ? 'primary' : 'default'} onClick={() => setRole('company')}>Company</Button>
          <Button type={role === 'admin' ? 'primary' : 'default'} onClick={() => setRole('admin')}>Admin</Button>
        </div>
        
        {/* Forms */}
        {role === 'employee' && <EmployeeForm />}
        {role === 'company' && <CompanyForm />}
        {role === 'admin' && <AdminForm />}
        
      </div>
    </div>
  );
};

export default LoginPage;
