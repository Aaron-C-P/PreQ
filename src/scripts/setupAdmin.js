import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGK63AtcAbwpHk8vjKCXssED5HNjAklAI",
  authDomain: "taxofficeschoolproject.firebaseapp.com",
  projectId: "taxofficeschoolproject",
  storageBucket: "taxofficeschoolproject.firebasestorage.app",
  messagingSenderId: "434461663688",
  appId: "1:434461663688:web:4670e58d3b0a17067ea0fd",
  measurementId: "G-SM4YE9BE67"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = '123admin4321';

async function setupAdmin() {
  try {
    // Try to sign in first to check if admin exists
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      // console.log (debugged)('Admin user already exists, updating documents...');
    } catch (signInError) {
      // If sign in fails, create new admin user
      await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      // console.log (debugged)('Created new admin user');
    }

    // Get the current user
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user found after authentication');
    }

    const timestamp = new Date().toISOString();

    // Create or update admin user document
    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      email: ADMIN_EMAIL,
      role: 'admin',
      createdAt: timestamp,
      updatedAt: timestamp
    }, { merge: true });

    // Create or update admin role document
    await setDoc(doc(db, 'adminUsers', user.uid), {
      email: ADMIN_EMAIL,
      role: 'admin',
      createdAt: timestamp,
      updatedAt: timestamp
    }, { merge: true });

    // Create or update initial stats document
    await setDoc(doc(db, 'stats', 'current'), {
      totalUsers: 1,
      activeQueues: 0,
      totalApplications: 0,
      pendingApplications: 0,
      avgWaitTime: 0,
      lastUpdated: timestamp
    }, { merge: true });

    // console.log (debugged)('Admin setup completed successfully');
    // console.log (debugged)('Admin email:', ADMIN_EMAIL);
    // console.log (debugged)('Admin password:', ADMIN_PASSWORD);
    
    process.exit(0);
  } catch (error) {
    console.error('Error setting up admin:', error);
    process.exit(1);
  }
}

setupAdmin();