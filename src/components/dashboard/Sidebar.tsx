import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  QueueListIcon,
  BellIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const navItems = [
  { path: '/dashboard', icon: HomeIcon, label: 'Dashboard' },
  { path: '/dashboard/queue', icon: QueueListIcon, label: 'Queue Status' },
  { path: '/dashboard/profile', icon: UserIcon, label: 'Profile' },
  { path: '/dashboard/notifications', icon: BellIcon, label: 'Notifications' },
  { path: '/dashboard/settings', icon: Cog6ToothIcon, label: 'Settings' },
  { path: '/dashboard/support', icon: QuestionMarkCircleIcon, label: 'Support' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="px-6 py-8">
        <div className="flex items-center mb-8">
          <span className="text-2xl font-bold text-blue-600">PreQue</span>
        </div>
        <ul className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={clsx(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                  location.pathname === path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;