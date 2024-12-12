import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { applicationService } from '../services/application.service';

export const useQueueId = () => {
  const { user } = useAuth();
  const [queueId, setQueueId] = useState<string | null>(null);

  useEffect(() => {
    const fetchQueueId = async () => {
      if (!user) return;
      
      try {
        const applications = await applicationService.getUserApplications(user.uid);
        // Generate queue ID based on total applications + 1000 for a nice starting number
        const id = (applications.length + 1000).toString().padStart(5, '0');
        setQueueId(id);
      } catch (error) {
        console.error('Error fetching queue ID:', error);
        setQueueId('00000');
      }
    };

    fetchQueueId();
  }, [user]);

  return queueId;
};