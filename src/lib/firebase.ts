// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, PhoneAuthProvider, ActionCodeSettings } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Phone Auth Provider
export const phoneAuthProvider = new PhoneAuthProvider(auth);
export const googleAuthProvider = new GoogleAuthProvider();

// Action code settings for email link authentication
export const actionCodeSettings: ActionCodeSettings = {
  url: `${window.location.origin}/login?type=passwordless`,
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.princegroup.vista'
  },
  android: {
    packageName: 'com.princegroup.vista',
    installApp: true,
  },
  dynamicLinkDomain: import.meta.env.VITE_FIREBASE_DYNAMIC_LINK_DOMAIN,
};