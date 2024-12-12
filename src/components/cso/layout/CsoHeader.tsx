import React from 'react';
import { FaBell, FaSun, FaMoon, FaUserCircle } from 'react-icons/fa';
import { useTheme } from '../../../hooks/useTheme';

const CsoHeader: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Dashboard - CSO View</h2>
      <div className="flex items-center gap-4">
        <button className="text-yellow-500 focus:outline-none">
          <FaBell size={24} />
        </button>
        <button
          onClick={toggleDarkMode}
          className="text-yellow-500 focus:outline-none"
        >
          {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>
        <FaUserCircle size={28} />
      </div>
    </header>
  );
};

export default CsoHeader;