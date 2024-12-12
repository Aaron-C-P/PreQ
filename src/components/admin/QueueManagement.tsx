import React from 'react';
import QueueTable from './QueueTable';

const QueueManagement: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Queue Management</h2>
      <QueueTable />
    </div>
  );
};

export default QueueManagement;