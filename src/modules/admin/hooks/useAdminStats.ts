import { useState, useEffect } from 'react';
import { AdminStats } from '../types/admin.types';
import { adminStatsService } from '../services/admin.stats.service';

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeQueues: 0,
    totalApplications: 0,
    pendingApplications: 0,
    avgWaitTime: 0,
    lastUpdated: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = adminStatsService.subscribeToStats((newStats) => {
      setStats(newStats);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { stats, loading, error };
};