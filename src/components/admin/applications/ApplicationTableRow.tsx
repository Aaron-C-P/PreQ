import React from 'react';
import { TaxApplication } from '../../../types/application';

interface ApplicationTableRowProps {
  application: TaxApplication;
  onReview: (id: string) => void;
  onDelete: (id: string) => void;
}

const ApplicationTableRow: React.FC<ApplicationTableRowProps> = ({
  application,
  onReview,
  onDelete,
}) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {application.personalInfo.fullName}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {application.applicationType}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
          {application.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {new Date(application.createdAt).toLocaleDateString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          onClick={() => onReview(application.id!)}
          className="text-blue-600 hover:text-blue-900 mr-4"
        >
          Review
        </button>
        <button
          onClick={() => onDelete(application.id!)}
          className="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ApplicationTableRow;