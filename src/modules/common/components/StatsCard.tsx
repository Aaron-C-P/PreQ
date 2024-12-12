import React from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  trend: string;
  trendDirection: 'up' | 'down';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, trend, trendDirection }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className={`ml-2 flex items-baseline text-sm font-semibold ${
          trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;