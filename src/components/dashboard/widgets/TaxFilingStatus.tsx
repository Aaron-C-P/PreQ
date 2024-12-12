import React from 'react';
import { TaxFiling } from '../../../types/dashboard';

interface TaxFilingStatusProps {
  filing: TaxFiling;
}

const TaxFilingStatus: React.FC<TaxFilingStatusProps> = ({ filing }) => {
  const getStatusColor = (status: TaxFiling['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Current Tax Filing Status</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tax Year {filing.year}</span>
          <span className={`px-3 py-1 rounded-full ${getStatusColor(filing.status)}`}>
            {filing.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        {filing.submissionDate && (
          <p className="text-sm text-gray-500">
            Submitted: {new Date(filing.submissionDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaxFilingStatus;