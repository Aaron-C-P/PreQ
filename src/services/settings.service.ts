import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

export const settingsService = {
  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    const user = auth.currentUser;
    if (!user || !user.email) throw new Error('No user logged in');

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async updateEmail(newEmail: string, password: string): Promise<void> {
    const user = auth.currentUser;
    if (!user || !user.email) throw new Error('No user logged in');

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await updateEmail(user, newEmail);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async deleteAccount(): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    try {
      // Delete user data from Firestore
      await deleteDoc(doc(db, 'users', user.uid));
      // Delete the user account
      await deleteUser(user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};