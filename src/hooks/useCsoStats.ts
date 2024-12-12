import { useState, useEffect } from 'react';

interface CsoStats {
  currentQueue: number;
  lateUsers: number;
  avgProcessingTime: number;
}

export const useCsoStats = () => {
  const [stats, setStats] = useState<CsoStats>({
    currentQueue: 23,
    lateUsers: 5,
    avgProcessingTime: 12
  });

  useEffect(() => {
    // TODO: Implement real-time stats fetching
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        currentQueue: Math.floor(Math.random() * 30) + 10
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { stats };
};