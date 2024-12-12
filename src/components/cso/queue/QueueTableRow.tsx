import React from 'react';
import { useTheme } from '../../../hooks/useTheme';

interface QueueUser {
  qid: string;
  name: string;
  service: string;
  price: string;
  scanTime: string;
  status: string;
  statusClass: string;
}

interface QueueTableRowProps {
  user: QueueUser;
}

const QueueTableRow: React.FC<QueueTableRowProps> = ({ user }) => {
  const { isDarkMode } = useTheme();

  return (
    <tr
      className={`hover:bg-gray-700 ${
        isDarkMode ? "border-b border-gray-700" : "border-b border-gray-300"
      }`}
    >
      <td className="p-2">{user.qid}</td>
      <td className="p-2">{user.name}</td>
      <td className="p-2">{user.service}</td>
      <td className="p-2">{user.price}</td>
      <td className="p-2">{user.scanTime}</td>
      <td className={`p-2 ${user.statusClass}`}>{user.status}</td>
    </tr>
  );
};

export default QueueTableRow;