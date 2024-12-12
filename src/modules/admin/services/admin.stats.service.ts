import { doc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { AdminStats } from '../types/admin.types';

export const adminStatsService = {
  subscribeToStats(callback: (stats: AdminStats) => void) {
    return onSnapshot(
      doc(db, 'stats', 'current'),
      (doc) => {
        if (doc.exists()) {
          callback(doc.data() as AdminStats);
        }
      },
      (error) => {
        console.error('Error subscribing to stats:', error);
      }
    );
  },

  async updateStats(updates: Partial<AdminStats>) {
    const statsRef = doc(db, 'stats', 'current');
    await updateDoc(statsRef, {
      ...updates,
      lastUpdated: new Date().toISOString()
    });
  },

  async incrementStat(field: keyof AdminStats) {
    const statsRef = doc(db, 'stats', 'current');
    await updateDoc(statsRef, {
      [field]: increment(1),
      lastUpdated: new Date().toISOString()
    });
  },

  async decrementStat(field: keyof AdminStats) {
    const statsRef = doc(db, 'stats', 'current');
    await updateDoc(statsRef, {
      [field]: increment(-1),
      lastUpdated: new Date().toISOString()
    });
  }
};