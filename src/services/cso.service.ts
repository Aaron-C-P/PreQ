import { collection, doc, getDoc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { User } from '../types/admin';

export const csoService = {
  async createCsoDocument(userId: string, email: string) {
    try {
      // Create CSO document
      await setDoc(doc(db, 'csoUsers', userId), {
        email,
        role: 'cso',
        createdAt: new Date().toISOString(),
        status: 'active',
        assignedQueues: [],
        lastActive: new Date().toISOString()
      });

      // Update user document with CSO role
      await setDoc(doc(db, 'users', userId), {
        email,
        role: 'cso',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, { merge: true });

      return true;
    } catch (error) {
      console.error('Error creating CSO document:', error);
      throw error;
    }
  },

  async isCsoUser(userId: string): Promise<boolean> {
    try {
      const csoDoc = await getDoc(doc(db, 'csoUsers', userId));
      return csoDoc.exists();
    } catch (error) {
      console.error('Error checking CSO status:', error);
      return false;
    }
  },

  async getAllCsoUsers(): Promise<User[]> {
    try {
      const csoSnapshot = await getDocs(collection(db, 'csoUsers'));
      return csoSnapshot.docs.map(doc => ({
        id: doc.id,
        email: doc.data().email,
        role: 'cso',
        createdAt: doc.data().createdAt
      }));
    } catch (error) {
      console.error('Error fetching CSO users:', error);
      throw error;
    }
  },

  async updateCsoStatus(userId: string, status: 'active' | 'inactive'): Promise<void> {
    try {
      await setDoc(doc(db, 'csoUsers', userId), {
        status,
        lastActive: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error('Error updating CSO status:', error);
      throw error;
    }
  }
};