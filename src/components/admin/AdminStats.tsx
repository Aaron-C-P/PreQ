import React from 'react';

const AdminStats: React.FC = () => {
  return (
    <div className="flex space-x-6">
      <div className="flex-1 bg-gray-700 p-6 rounded-lg text-center">
        <h3 className="text-gray-400">Total Active Queues</h3>
        <p className="text-2xl font-bold">3</p>
      </div>
      <div className="flex-1 bg-gray-700 p-6 rounded-lg text-center">
        <h3 className="text-gray-400">Total Customers Waiting</h3>
        <p className="text-2xl font-bold">45</p>
      </div>
      <div className="flex-1 bg-gray-700 p-6 rounded-lg text-center">
        <h3 className="text-gray-400">Avg. Wait Time (mins)</h3>
        <p className="text-2xl font-bold">22</p>
      </div>
    </div>
  );
};

export default AdminStats;