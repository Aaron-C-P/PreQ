import React from 'react';
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';
import AuthLayout from './layout/AuthLayout';

interface AuthPageProps {
  isSignup: boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ isSignup }) => {
  return (
    <AuthLayout>
      {isSignup ? <RegisterForm /> : <LoginForm />}
    </AuthLayout>
  );
};

export default AuthPage;