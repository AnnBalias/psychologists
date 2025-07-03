import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL:
    'https://psychologists-21652-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'psychologists-21652.firebasestorage.app',
  messagingSenderId: '69451097121',
  appId: '1:69451097121:web:939eae0d68acca607b2f60',
  measurementId: 'G-2SNXDWYLDH',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
