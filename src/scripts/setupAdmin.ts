import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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
const ADMIN_PASSWORD = 'admin';

async function setupAdmin() {
  try {
    // Create admin user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      ADMIN_EMAIL,
      ADMIN_PASSWORD
    );

    // Create admin document
    await setDoc(doc(db, 'adminUsers', userCredential.user.uid), {
      email: ADMIN_EMAIL,
      role: 'admin',
      createdAt: new Date().toISOString()
    });

    // Create initial stats
    await setDoc(doc(db, 'stats', 'current'), {
      activeQueues: 0,
      totalWaiting: 0,
      avgWaitTime: 0,
      lastUpdated: new Date().toISOString()
    });

    // console.log (debugged)('Admin user created successfully');
    // console.log (debugged)('Email:', ADMIN_EMAIL);
    // console.log (debugged)('Password:', ADMIN_PASSWORD);
    // console.log (debugged)('Admin UID:', userCredential.user.uid);
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      // console.log (debugged)('Admin user already exists');
    } else {
      console.error('Error creating admin:', error);
    }
  }
}

setupAdmin().then(() => process.exit());