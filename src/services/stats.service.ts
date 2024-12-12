import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const statsService = {
  async incrementUsers() {
    const statsRef = doc(db, 'stats', 'current');
    await updateDoc(statsRef, {
      totalUsers: increment(1),
      lastUpdated: new Date().toISOString()
    });
  },

  async incrementApplications() {
    const statsRef = doc(db, 'stats', 'current');
    await updateDoc(statsRef, {
      totalApplications: increment(1),
      pendingApplications: increment(1),
      lastUpdated: new Date().toISOString()
    });
  },

  async updateQueueStats(activeQueues: number, avgWaitTime: number) {
    const statsRef = doc(db, 'stats', 'current');
    await updateDoc(statsRef, {
      activeQueues,
      avgWaitTime,
      lastUpdated: new Date().toISOString()
    });
  },

  async decrementPendingApplications() {
    const statsRef = doc(db, 'stats', 'current');
    await updateDoc(statsRef, {
      pendingApplications: increment(-1),
      lastUpdated: new Date().toISOString()
    });
  }
};