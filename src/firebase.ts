// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "recipe-project-3b924.firebaseapp.com",
  projectId: "recipe-project-3b924",
  storageBucket: "recipe-project-3b924.appspot.com",
  messagingSenderId: "629932669166",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-78CRKNGPEX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;
