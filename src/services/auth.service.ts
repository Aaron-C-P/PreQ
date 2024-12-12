import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { UserRegistration } from '../types/auth';

export const authService = {
  async register(data: UserRegistration) {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Create user document in Firestore
      const timestamp = new Date().toISOString();
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        role: 'user',
        createdAt: timestamp,
        updatedAt: timestamp
      });

      return userCredential.user;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message);
    }
  },

  async loginWithCredentials(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Get user role
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      const userData = userDoc.data();
      const role = userData?.role || 'user';

      // Store role in localStorage
      localStorage.setItem('userRole', role);
      
      return { user: userCredential.user, role };
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message);
    }
  },

  async logout() {
    try {
      localStorage.removeItem('userRole');
      await signOut(auth);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message);
    }
  },

  getUserRole(): string {
    return localStorage.getItem('userRole') || 'user';
  }
};