import React, { useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../../../config/csoMenu';

interface SidebarProps {
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isDarkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } ${isDarkMode ? "bg-blue-800" : "bg-blue-500"} flex flex-col transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        {isSidebarOpen && <h1 className="text-xl font-bold text-yellow-300">PreQ</h1>}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-yellow-300 focus:outline-none"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav className="flex-1">
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 cursor-pointer"
            >
              <span>{item.icon}</span>
              {isSidebarOpen && <span>{item.name}</span>}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;