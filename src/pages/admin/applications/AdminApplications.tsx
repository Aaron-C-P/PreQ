import React from 'react';
import { useApplications } from '../../../hooks/useApplications';
import ApplicationsTable from '../../../components/admin/applications/ApplicationsTable';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const AdminApplications: React.FC = () => {
  const { applications, loading, error, handleReview, handleDelete } = useApplications();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-red-600 p-4">
        Error loading applications: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
        <div className="flex space-x-4">
          <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export Data
          </button>
        </div>
      </div>

      <ApplicationsTable
        applications={applications}
        onReview={handleReview}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminApplications;