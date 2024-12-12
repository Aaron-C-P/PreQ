import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const csoAuthService = {
  async verifyCsoAccess(uid: string): Promise<boolean> {
    try {
      const csoDoc = await getDoc(doc(db, 'csoUsers', uid));
      return csoDoc.exists();
    } catch (error) {
      console.error('Error verifying CSO access:', error);
      return false;
    }
  },

  async createCsoDocument(uid: string, email: string) {
    try {
      const timestamp = new Date().toISOString();
      
      // Create CSO user document
      await setDoc(doc(db, 'csoUsers', uid), {
        email,
        role: 'cso',
        createdAt: timestamp,
        updatedAt: timestamp,
        status: 'active'
      });

      return true;
    } catch (error) {
      console.error('Error creating CSO document:', error);
      throw error;
    }
  }
};