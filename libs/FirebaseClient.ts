// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  Auth,
} from "firebase/auth";
import { User } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCT-kQlmeqmDQAa3bwtsbeJ_anrzYafnU",
  authDomain: "solsignal-app.firebaseapp.com",
  projectId: "solsignal-app",
  storageBucket: "solsignal-app.appspot.com",
  messagingSenderId: "791998878696",
  appId: "1:791998878696:web:d8458c92ff9849c7ab0a5d",
  measurementId: "G-RT56TN93YY",
};

// Initialize Firebase

function getFirebase() {
  return initializeApp(firebaseConfig);
}

export function getFirebaseAuth() {
  const firebase = getFirebase();
  return getAuth(firebase);
}

export class FirebaseClient {
  firebaseApp: FirebaseApp;
  analytics: Analytics;
  auth: Auth;

  constructor() {
    console.log("FirebaseClient constructor");
    this.firebaseApp = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.firebaseApp);
    this.auth = getAuth(this.firebaseApp);
  }

  async loginWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential === null) {
          const errorMessage =
            "Error logging in with Google: credential is null";
          console.log(errorMessage);
          throw Error(errorMessage);
        }
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        return user;
      })
      .catch((error) => {
        return Promise.reject(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Error logging in with Google: ", error);
        throw error;
      });
  }
}
