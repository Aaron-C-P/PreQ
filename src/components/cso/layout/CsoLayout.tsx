import React, { useState } from 'react';
import Sidebar from './Sidebar';

interface CsoLayoutProps {
  children: React.ReactNode;
}

const CsoLayout: React.FC<CsoLayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        isDarkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Sidebar isDarkMode={isDarkMode} />
      {children}
    </div>
  );
};

export default CsoLayout;