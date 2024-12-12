import React from 'react';
import { useQueue } from '../../../hooks/useQueue';
import QueueTable from '../../../components/admin/queue/QueueTable';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const AdminQueue: React.FC = () => {
  const { queues, loading, error, handleEdit, handleDelete } = useQueue();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-red-600 p-4">
        Error loading queues: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Queue Management</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Create New Queue
        </button>
      </div>

      <QueueTable
        queues={queues}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminQueue;