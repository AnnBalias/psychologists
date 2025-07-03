import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  databaseURL:
    'https://psychologists-21652-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'psychologists-21652.firebasestorage.app',
  messagingSenderId: '69451097121',
  appId: '1:69451097121:web:939eae0d68acca607b2f60',
  measurementId: 'G-2SNXDWYLDH',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
