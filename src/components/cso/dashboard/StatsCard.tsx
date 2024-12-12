import React from 'react';
import { useTheme } from '../../../hooks/useTheme';

interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`p-4 rounded-lg shadow-md text-center ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h3 className="text-sm text-gray-500">{title}</h3>
      <h1 className="text-4xl font-bold text-yellow-500">{value}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

export default StatsCard;