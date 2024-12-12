import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../../../hooks/useAdminAuth';
import LoadingSpinner from '../../common/LoadingSpinner';
import AuthFormFields from '../AuthFormFields';

const AdminLoginForm: React.FC = () => {
  const { formState, handleSubmit, loading, error } = useAdminAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Admin Login
      </h2>
      
      {error && (
        <div className="mt-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <AuthFormFields formState={formState} />
        
        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Sign in as Admin
          </button>
        </div>

        <div className="text-sm text-center">
          <Link
            to="/"
            className="font-medium text-gray-600 hover:text-gray-500"
          >
            Return to Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;