import React from 'react';

const AdminHome = ({ admin }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full h-full">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, {admin?._doc?.teamUserName || "Admin"}!
      </h1>
      <h2 className="text-xl font-semibold text-gray-700 mt-2">Role: ADMIN</h2>
      <p className="text-gray-600 mt-2">This is your Admin Dashboard.</p>
    </div>
  );
};

export default AdminHome;
