import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWLDXLFa93ZSoN-93TskpcYzYwOVLJ7eU",
  authDomain: "chat-app-d76aa.firebaseapp.com",
  projectId: "chat-app-d76aa",
  storageBucket: "chat-app-d76aa.firebasestorage.app",
  messagingSenderId: "949005760394",
  appId: "1:949005760394:web:36da2915024a67000bba73"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const storage = getStorage();

export const db = getFirestore();