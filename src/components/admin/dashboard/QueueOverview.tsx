import React from 'react';
import { Link } from 'react-router-dom';

const QueueOverview: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Queue Status</h2>
        <Link
          to="/admin/queue"
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium">Current Queue</p>
            <p className="text-sm text-gray-500">15 applications waiting</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">20 min</p>
            <p className="text-sm text-gray-500">avg. wait time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueOverview;