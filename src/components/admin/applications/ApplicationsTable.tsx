import React from 'react';
import { TaxApplication } from '../../../types/application';
import ApplicationTableRow from './ApplicationTableRow';

interface ApplicationsTableProps {
  applications: TaxApplication[];
  onReview: (id: string) => void;
  onDelete: (id: string) => void;
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  onReview,
  onDelete,
}) => {
  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No applications found</p>
      </div>
    );
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Applicant
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Service Type
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Submission Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {applications.map((application) => (
          <ApplicationTableRow
            key={application.id}
            application={application}
            onReview={onReview}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ApplicationsTable;