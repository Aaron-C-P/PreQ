import React from 'react';

const queueData = [
  {
    name: 'Queue A',
    activeCustomers: 15,
    waitTime: '20 mins',
  },
  {
    name: 'Queue B',
    activeCustomers: 8,
    waitTime: '15 mins',
  },
];

const QueueTable: React.FC = () => {
  return (
    <table className="w-full border-collapse">
      <thead className="bg-gray-700">
        <tr>
          <th className="text-left px-4 py-2 text-gray-400">Queue Name</th>
          <th className="text-left px-4 py-2 text-gray-400">Active Customers</th>
          <th className="text-left px-4 py-2 text-gray-400">Avg. Wait Time</th>
          <th className="text-left px-4 py-2 text-gray-400">Actions</th>
        </tr>
      </thead>
      <tbody>
        {queueData.map((queue) => (
          <tr key={queue.name} className="bg-gray-800">
            <td className="px-4 py-2">{queue.name}</td>
            <td className="px-4 py-2">{queue.activeCustomers}</td>
            <td className="px-4 py-2">{queue.waitTime}</td>
            <td className="px-4 py-2">
              <button className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500">
                Manage
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QueueTable;