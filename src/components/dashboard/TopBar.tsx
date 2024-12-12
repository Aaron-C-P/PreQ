import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { useQueueId } from '../../hooks/useQueueId';

const TopBar: React.FC = () => {
  const { user, signOut } = useAuth();
  const queueId = useQueueId();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome Back!</h2>
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-gray-400 hover:text-gray-500">
              <BellIcon className="w-6 h-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">{user?.email}</span>
                <span className="text-xs text-gray-500">Queue ID: #{queueId}</span>
              </div>
              <button
                onClick={signOut}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;