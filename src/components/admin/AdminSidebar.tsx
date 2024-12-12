import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const menuItems = [
  { path: '/admin', label: 'Overview' },
  { path: '/admin/status', label: 'Status' },
  { path: '/admin/appointments', label: 'Appointments' },
  { path: '/admin/queue', label: 'Queue' },
  { path: '/admin/profile', label: 'Profile' },
  { path: '/admin/settings', label: 'Settings' },
  { path: '/admin/faq', label: 'FAQ' },
  { path: '/admin/reports', label: 'Reports' },
  { path: '/admin/documents', label: 'Documents' },
  { path: '/admin/analytics', label: 'Analytics' },
  { path: '/admin/ai-analytics', label: 'AI Analytics' },
  { path: '/admin/feedback', label: 'Feedback' },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-800 text-white p-6">
      <Link to="/admin" className="block">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">PreQ</h2>
      </Link>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={clsx(
                'block hover:text-yellow-400 transition-colors',
                location.pathname === item.path
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;