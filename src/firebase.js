// src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBZwov0guSB0PV8sVug1TCMBHDtbHSMzFY",
  authDomain: "grow-vejindi-10.firebaseapp.com",
  projectId: "grow-vejindi-10",
  storageBucket: "grow-vejindi-10.firebasestorage.app",
  messagingSenderId: "1029611898382",
  appId: "1:1029611898382:web:899859a68d5249a7f55e5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
