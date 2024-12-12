import { collection, getDocs, query, where, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AdminStats, QueueData } from '../types/admin';

export const adminService = {
  async verifyAdminAccess(uid: string): Promise<boolean> {
    try {
      const adminDoc = await getDoc(doc(db, 'adminUsers', uid));
      return adminDoc.exists();
    } catch (error) {
      console.error('Error verifying admin access:', error);
      return false;
    }
  },

  async getStats(): Promise<AdminStats> {
    try {
      // Get stats from the stats document
      const statsDoc = await getDoc(doc(db, 'stats', 'current'));
      
      if (!statsDoc.exists()) {
        // Create default stats if they don't exist
        const defaultStats: AdminStats = {
          activeQueues: 0,
          totalWaiting: 0,
          avgWaitTime: 0,
        };
        
        await setDoc(doc(db, 'stats', 'current'), {
          ...defaultStats,
          lastUpdated: new Date().toISOString(),
        });
        
        return defaultStats;
      }
      
      return statsDoc.data() as AdminStats;
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      throw new Error('Failed to fetch admin statistics');
    }
  },

  async getQueues(): Promise<QueueData[]> {
    try {
      const snapshot = await getDocs(collection(db, 'queues'));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as QueueData[];
    } catch (error) {
      console.error('Error fetching queues:', error);
      throw new Error('Failed to fetch queues');
    }
  },
};