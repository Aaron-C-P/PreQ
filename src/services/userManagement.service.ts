import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebase/firebase';
import { User } from '../types/admin';
import { statsService } from './stats.service';

export const userManagementService = {
  async getAllUsers(): Promise<User[]> {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      return usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  },

  async createUser(userData: Omit<User, 'id'>): Promise<void> {
    try {
      const tempPassword = '123456';
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        tempPassword
      );

      const userId = userCredential.user.uid;
      const timestamp = new Date().toISOString();

      // Create user document
      await setDoc(doc(db, 'users', userId), {
        email: userData.email,
        role: userData.role,
        createdAt: timestamp
      });

      // Create role-specific document
      if (userData.role === 'admin') {
        await setDoc(doc(db, 'adminUsers', userId), {
          email: userData.email,
          role: 'admin',
          createdAt: timestamp
        });
      } else if (userData.role === 'cso') {
        await setDoc(doc(db, 'csoUsers', userId), {
          email: userData.email,
          role: 'cso',
          createdAt: timestamp
        });
      }

      // Update stats
      await statsService.incrementUsers();

      // console.log (debugged)('User created successfully with temporary password:', tempPassword);
    } catch (error: any) {
      console.error('Error creating user:', error);
      throw new Error(error.message || 'Failed to create user');
    }
  },

  async updateUserRole(userId: string, newRole: 'user' | 'admin' | 'cso'): Promise<void> {
    try {
      // Update main user document
      await updateDoc(doc(db, 'users', userId), {
        role: newRole,
        updatedAt: new Date().toISOString()
      });

      // Remove existing role documents
      await deleteDoc(doc(db, 'adminUsers', userId));
      await deleteDoc(doc(db, 'csoUsers', userId));

      // Create new role document
      const userData = (await getDocs(query(collection(db, 'users'), where('id', '==', userId)))).docs[0].data();
      
      if (newRole === 'admin') {
        await setDoc(doc(db, 'adminUsers', userId), {
          email: userData.email,
          role: 'admin',
          createdAt: new Date().toISOString()
        });
      } else if (newRole === 'cso') {
        await setDoc(doc(db, 'csoUsers', userId), {
          email: userData.email,
          role: 'cso',
          createdAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      throw new Error('Failed to update user role');
    }
  }
};