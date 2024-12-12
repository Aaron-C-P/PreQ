import React from 'react';
import { AdminStats as AdminStatsType } from '../../../types/admin';
import StatsCard from './StatsCard';
import {
  UsersIcon,
  ClockIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

interface AdminStatsProps {
  stats: AdminStatsType;
}

const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
  const statItems = [
    {
      name: 'Active Applications',
      value: stats.totalWaiting,
      icon: DocumentTextIcon,
      change: '+4.75%',
      changeType: 'positive' as const,
    },
    {
      name: 'Users in Queue',
      value: stats.activeQueues,
      icon: UsersIcon,
      change: '-1.39%',
      changeType: 'negative' as const,
    },
    {
      name: 'Average Processing Time',
      value: `${stats.avgWaitTime} mins`,
      icon: ClockIcon,
      change: '-2.45%',
      changeType: 'positive' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {statItems.map((item) => (
        <StatsCard key={item.name} {...item} />
      ))}
    </div>
  );
};

export default AdminStats;