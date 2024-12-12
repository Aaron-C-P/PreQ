import React from 'react';
import { type IconType } from '@heroicons/react/24/outline';

interface StatsCardProps {
  name: string;
  value: string | number;
  icon: IconType;
  change: string;
  changeType: 'positive' | 'negative';
}

const StatsCard: React.FC<StatsCardProps> = ({
  name,
  value,
  icon: Icon,
  change,
  changeType,
}) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
      <dt>
        <div className="absolute rounded-md bg-blue-500 p-3">
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <p className="ml-16 truncate text-sm font-medium text-gray-500">
          {name}
        </p>
      </dt>
      <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p
          className={`ml-2 flex items-baseline text-sm font-semibold ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change}
        </p>
      </dd>
    </div>
  );
}

export default StatsCard;