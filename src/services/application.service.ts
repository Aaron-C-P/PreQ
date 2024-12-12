import { collection, addDoc, getDocs, query, where, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { TaxApplication } from '../types/application';
import { statsService } from './stats.service';

export const applicationService = {
  async createApplication(application: Omit<TaxApplication, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<TaxApplication> {
    try {
      const timestamp = new Date().toISOString();
      const newApplication = {
        ...application,
        status: 'pending',
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      
      const docRef = await addDoc(collection(db, 'applications'), newApplication);
      await statsService.incrementApplications();
      
      return {
        id: docRef.id,
        ...newApplication
      } as TaxApplication;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  },

  async getUserApplications(userId: string): Promise<TaxApplication[]> {
    try {
      const q = query(collection(db, 'applications'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TaxApplication[];
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  async getAllApplications(): Promise<TaxApplication[]> {
    try {
      const snapshot = await getDocs(collection(db, 'applications'));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TaxApplication[];
    } catch (error) {
      console.error('Error fetching all applications:', error);
      throw error;
    }
  },

  async updateApplication(id: string, updates: Partial<TaxApplication>): Promise<void> {
    try {
      const docRef = doc(db, 'applications', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  }
};