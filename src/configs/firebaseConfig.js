import { initializeApp } from 'firebase/app';
import { getAuth, OAuthProvider, SAMLAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
    projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MASSAGING_SENDER_ID}`,
    appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
    // measurementId: `${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID}`
};

// Verifica si ya existe una instancia de la aplicación Firebase
const app = initializeApp(firebaseConfig, `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

let analytics = null;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const provider = new SAMLAuthProvider('saml.oauth');

export { app, auth, firestore, storage, provider, analytics };
