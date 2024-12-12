import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminHeader: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard - Admin View</h1>
      <div className="space-x-4">
        <Link
          to="/admin"
          className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
        >
          Admin
        </Link>
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
        >
          User
        </Link>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;