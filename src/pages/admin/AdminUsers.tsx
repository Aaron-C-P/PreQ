import React from 'react';
import UserManagement from './users/UserManagement';

const AdminUsers: React.FC = () => {
  return (
    <div className="p-6">
      <UserManagement />
    </div>
  );
};

export default AdminUsers;