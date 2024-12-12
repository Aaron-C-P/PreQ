import React from 'react';

const CustomerFlow: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Customer Flow Today</h2>
      <div className="space-x-4 mb-4">
        <button className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500">
          Bar Chart
        </button>
        <button className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500">
          Line Chart
        </button>
      </div>
      <div className="h-52 bg-gray-700 rounded-lg"></div>
    </div>
  );
};

export default CustomerFlow;