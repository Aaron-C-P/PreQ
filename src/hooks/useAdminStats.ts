import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AdminStats } from '../types/admin';

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
    const unsubscribeStats = onSnapshot(
      doc(db, 'stats', 'current'),
      (doc) => {
        if (doc.exists()) {
          setStats(doc.data() as AdminStats);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching stats:', err);
        setError('Failed to fetch statistics');
        setLoading(false);
      }
    );

    return () => {
      unsubscribeStats();
    };
  }, []);

  return { stats, loading, error };
};