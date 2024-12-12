import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';

export const setupAdminUser = async () => {
  try {
    // Create admin user in Firebase Auth
    const adminCredential = await createUserWithEmailAndPassword(
      auth,
      'admin@admin.com',
      'admin'
    );

    // Create admin document in Firestore
    await setDoc(doc(db, 'adminUsers', adminCredential.user.uid), {
      email: 'admin@admin.com',
      role: 'admin',
      createdAt: new Date().toISOString(),
    });

    // Create initial stats document
    await setDoc(doc(db, 'stats', 'current'), {
      activeQueues: 0,
      totalWaiting: 0,
      avgWaitTime: 0,
      lastUpdated: new Date().toISOString(),
    });

    // console.log (debugged)('Admin user setup completed successfully');
    return adminCredential.user.uid;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      // console.log (debugged)('Admin user already exists');
    } else {
      console.error('Error setting up admin user:', error);
      throw error;
    }
  }
};