import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
            apiKey: import.meta.env.VITE_APIKEY,
            authDomain: import.meta.env.VITE_AUTHDOMAIN,
            projectId: import.meta.env.VITE_PROJECTID,
            storageBucket: import.meta.env.VITE_STORAGEBUCKETID,
            messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
            appId: import.meta.env.VITE_APPID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const storage = getStorage();

export const db = getFirestore();