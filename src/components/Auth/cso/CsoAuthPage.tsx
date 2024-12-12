import React from 'react';
import CsoLoginForm from './CsoLoginForm';
import AuthLayout from '../layout/AuthLayout';

const CsoAuthPage: React.FC = () => {
  return (
    <AuthLayout>
      <CsoLoginForm />
    </AuthLayout>
  );
};

export default CsoAuthPage;