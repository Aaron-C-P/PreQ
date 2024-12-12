import React from 'react';
import { useCsoStats } from '../../../hooks/useCsoStats';
import StatsCard from './StatsCard';

const StatsGrid: React.FC = () => {
  const { stats } = useCsoStats();

  return (
    <div className="grid grid-cols-3 gap-6">
      <StatsCard
        title="Current Queue"
        value={stats.currentQueue}
        subtitle="Users in queue"
      />
      <StatsCard
        title="Late Users"
        value={stats.lateUsers}
        subtitle="Users marked as late"
      />
      <StatsCard
        title="Processing Time"
        value={`${stats.avgProcessingTime}m`}
        subtitle="Average wait time"
      />
    </div>
  );
};

export default StatsGrid;