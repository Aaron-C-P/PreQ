import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { useQueue } from '../../../hooks/useQueue';
import QueueTableHeader from './QueueTableHeader';
import QueueTableRow from './QueueTableRow';

const QueueTable: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { queueData } = useQueue();

  return (
    <section
      className={`p-4 rounded-lg shadow-md ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h3 className="text-lg font-bold mb-4">Active Queue</h3>
      <table className="w-full table-auto text-left text-sm">
        <QueueTableHeader />
        <tbody>
          {queueData.map((user, index) => (
            <QueueTableRow key={index} user={user} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default QueueTable;