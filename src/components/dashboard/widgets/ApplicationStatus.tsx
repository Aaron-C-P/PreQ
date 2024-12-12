import React from 'react';
import { Link } from 'react-router-dom';
import { TaxApplication } from '../../../types/application';

interface ApplicationStatusProps {
  applications: TaxApplication[];
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ applications }) => {
  const getStatusColor = (status: TaxApplication['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Applications</h3>
        <Link
          to="/dashboard/apply"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          New Application
        </Link>
      </div>
      
      {applications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No applications found</p>
          <Link
            to="/dashboard/apply"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Start your first application
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {application.personalInfo.fullName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Tax Year: {application.taxInfo.taxYear}
                  </p>
                  <p className="text-sm text-gray-500">
                    Submitted: {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                    application.status
                  )}`}
                >
                  {application.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;