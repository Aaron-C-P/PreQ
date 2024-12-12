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

const CSO_EMAIL = 'cso@preque.com';
const CSO_PASSWORD = 'cso123456';

async function setupCso() {
  try {
    // Create CSO user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      CSO_EMAIL,
      CSO_PASSWORD
    );

    const timestamp = new Date().toISOString();

    // Create CSO document
    await setDoc(doc(db, 'csoUsers', userCredential.user.uid), {
      email: CSO_EMAIL,
      role: 'cso',
      createdAt: timestamp,
      updatedAt: timestamp,
      status: 'active'
    });

    // Create user document with CSO role
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: CSO_EMAIL,
      role: 'cso',
      createdAt: timestamp,
      updatedAt: timestamp
    });

    // console.log (debugged)('CSO user created successfully');
    // console.log (debugged)('Email:', CSO_EMAIL);
    // console.log (debugged)('Password:', CSO_PASSWORD);
    // console.log (debugged)('CSO UID:', userCredential.user.uid);
    
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      // console.log (debugged)('CSO user already exists');
    } else {
      console.error('Error creating CSO:', error);
    }
    process.exit(1);
  }
}

setupCso();