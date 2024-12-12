import React from 'react';
import { AdminStats } from '../../types/admin.types';
import StatsCard from '../../../common/components/StatsCard';

interface StatsOverviewProps {
  stats: AdminStats;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Users"
        value={stats.totalUsers}
        trend="+12%"
        trendDirection="up"
      />
      <StatsCard
        title="Active Queues"
        value={stats.activeQueues}
        trend="+5%"
        trendDirection="up"
      />
      <StatsCard
        title="Pending Applications"
        value={stats.pendingApplications}
        trend="-2%"
        trendDirection="down"
      />
      <StatsCard
        title="Avg. Wait Time"
        value={`${stats.avgWaitTime}m`}
        trend="-8%"
        trendDirection="down"
      />
    </div>
  );
};

export default StatsOverview;