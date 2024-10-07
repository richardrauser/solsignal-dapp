import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "solsignal-app.firebaseapp.com",
  projectId: "solsignal-app",
  storageBucket: "solsignal-app.appspot.com",
  messagingSenderId: "791998878696",
  appId: "1:791998878696:web:d8458c92ff9849c7ab0a5d",
  measurementId: "G-RT56TN93YY",
};

export function getFirebase() {
  return initializeApp(firebaseConfig);
}

export function getFirebaseAuth() {
  const firebase = getFirebase();

  return getAuth(firebase);
}
