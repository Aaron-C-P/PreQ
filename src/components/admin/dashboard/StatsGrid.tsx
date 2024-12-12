import React from 'react';
import { AdminStats } from '../../../types/admin';
import {
  UsersIcon,
  ClockIcon,
  QueueListIcon,
} from '@heroicons/react/24/outline';

interface StatsGridProps {
  stats: AdminStats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const statItems = [
    {
      name: 'Active Queues',
      value: stats.activeQueues,
      icon: QueueListIcon,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: 'Total Waiting',
      value: stats.totalWaiting,
      icon: UsersIcon,
      change: '-1.39%',
      changeType: 'negative',
    },
    {
      name: 'Average Wait Time',
      value: `${stats.avgWaitTime} mins`,
      icon: ClockIcon,
      change: '-2.45%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {statItems.map((item) => (
        <div
          key={item.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-blue-500 p-3">
              <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {item.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {item.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;