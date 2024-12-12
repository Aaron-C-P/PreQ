import React from 'react';
import { useAdminStats } from '../../hooks/useAdminStats';
import AdminStats from '../../components/admin/dashboard/AdminStats';
import QueueOverview from '../../components/admin/dashboard/QueueOverview';
import ApplicationsOverview from '../../components/admin/dashboard/ApplicationsOverview';

const AdminOverview: React.FC = () => {
  const { stats, loading, error } = useAdminStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4">
        Error loading admin dashboard: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminStats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QueueOverview />
        <ApplicationsOverview />
      </div>
    </div>
  );
};

export default AdminOverview;