import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AUTH_CONSTANTS } from '../config/constants';

export const adminAuthService = {
  async createAdminDocument(uid: string) {
    try {
      // Create admin user document
      const adminDocRef = doc(db, 'adminUsers', uid);
      await setDoc(adminDocRef, {
        email: AUTH_CONSTANTS.ADMIN.EMAIL,
        role: 'admin',
        createdAt: new Date().toISOString()
      }, { merge: true });

      // Create initial stats document
      const statsDocRef = doc(db, 'stats', 'current');
      await setDoc(statsDocRef, {
        activeQueues: 0,
        totalWaiting: 0,
        avgWaitTime: 0,
        lastUpdated: new Date().toISOString()
      }, { merge: true });

      return true;
    } catch (error) {
      console.error('Error creating admin document:', error);
      throw error;
    }
  },

  async isAdminUser(uid: string): Promise<boolean> {
    try {
      const adminDocRef = doc(db, 'adminUsers', uid);
      const adminDoc = await getDoc(adminDocRef);
      return adminDoc.exists();
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }
};