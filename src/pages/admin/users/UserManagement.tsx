import React, { useState, useEffect } from 'react';
import { userManagementService } from '../../../services/userManagement.service';
import UserTable from './UserTable';
import AddUserModal from './AddUserModal';
import { User } from '../../../types/admin';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await userManagementService.getAllUsers();
      setUsers(fetchedUsers);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (userData: Omit<User, 'id'>) => {
    try {
      setError(null);
      await userManagementService.createUser(userData);
      await fetchUsers();
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateRole = async (userId: string, role: 'user' | 'admin' | 'cso') => {
    try {
      setError(null);
      await userManagementService.updateUserRole(userId, role);
      await fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Total Users: {users.length}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add User
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <UserTable users={users} onUpdateRole={handleUpdateRole} />
      
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
};

export default UserManagement;