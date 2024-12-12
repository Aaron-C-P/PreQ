import React from 'react';
import AdminLoginForm from './AdminLoginForm';
import AuthLayout from '../layout/AuthLayout';

const AdminAuthPage: React.FC = () => {
  return (
    <AuthLayout>
      <AdminLoginForm />
    </AuthLayout>
  );
};

export default AdminAuthPage;