import React from 'react';
import { Link } from 'react-router-dom';

const ApplicationsOverview: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
        <Link
          to="/admin/applications"
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-500">Individual Tax Return</p>
            </div>
            <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
              Pending Review
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsOverview;