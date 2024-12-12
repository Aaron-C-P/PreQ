import { useState, useEffect } from 'react';
import { applicationService } from '../services/application.service';
import { TaxApplication } from '../types/application';

export const useApplications = () => {
  const [applications, setApplications] = useState<TaxApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      const data = await applicationService.getAllApplications();
      setApplications(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleReview = async (id: string) => {
    try {
      await applicationService.updateApplicationStatus(id, 'under_review');
      await fetchApplications();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    // Implement delete functionality
    // console.log (debugged)('Delete application:', id);
  };

  return {
    applications,
    loading,
    error,
    handleReview,
    handleDelete,
  };
};