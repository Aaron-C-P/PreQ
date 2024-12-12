import React from 'react';
import { useTheme } from '../../../hooks/useTheme';

const QueueTableHeader: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <thead
      className={`${
        isDarkMode ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-600"
      }`}
    >
      <tr>
        <th className="p-2">QID</th>
        <th className="p-2">Name</th>
        <th className="p-2">Service</th>
        <th className="p-2">Price</th>
        <th className="p-2">Scan Time</th>
        <th className="p-2">Status</th>
      </tr>
    </thead>
  );
};

export default QueueTableHeader;