import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { UserProfile } from '../types/profile';

export const profileService = {
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      }

      // If profile doesn't exist, create an empty one
      const emptyProfile: UserProfile = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await setDoc(docRef, emptyProfile);
      return emptyProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId);
      const updatedData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      await setDoc(docRef, updatedData, { merge: true }); // Use merge to update only changed fields
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
};