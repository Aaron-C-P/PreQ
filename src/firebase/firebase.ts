import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
export const auth = getAuth(app);
export const db = getFirestore(app);