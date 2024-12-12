import React from 'react';
import { AuthFormState } from '../../hooks/useAuthForm';

interface AuthFormFieldsProps {
  formState: AuthFormState;
}

const AuthFormFields: React.FC<AuthFormFieldsProps> = ({ formState }) => {
  const { email, setEmail, password, setPassword } = formState;

  return (
    <div className="rounded-md shadow-sm -space-y-px">
      <div>
        <input
          type="email"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AuthFormFields;