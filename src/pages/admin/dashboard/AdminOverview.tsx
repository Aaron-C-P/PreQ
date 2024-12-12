import React from 'react';
import { useAdminStats } from '../../../hooks/useAdminStats';
import AdminStats from '../../../components/admin/dashboard/AdminStats';
import ApplicationsChart from '../../../modules/admin/components/dashboard/ApplicationsChart';
import UserActivityChart from '../../../modules/admin/components/dashboard/UserActivityChart';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const AdminOverview: React.FC = () => {
  const { stats, loading, error } = useAdminStats();

  if (loading) {
    return <LoadingSpinner />;
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
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      
      <AdminStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Application Status</h3>
          <ApplicationsChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">User Activity</h3>
          <UserActivityChart />
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;