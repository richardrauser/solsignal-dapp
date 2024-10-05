import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { User } from "firebase/auth";
import toast from "react-hot-toast";

import { getFirebaseAuth } from "./firebase";

export const LOCAL_STORE_EMAIL_FOR_AUTH_KEY = "solSignalEmailForAuth";

export const loginWithEmail = async (email: string, continueUrl: string) => {
  console.log(
    `loginWithEmail - logging in with email ${email} and continue URL ${continueUrl}`,
  );
  try {
    const auth = getAuth();
    const actionCodeSettings = {
      url: `${continueUrl}/auth/link`,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem(LOCAL_STORE_EMAIL_FOR_AUTH_KEY, email);
    toast.success("Email sent. Check your inbox to complete login.");
  } catch (error) {
    console.log(error);
  }
};
export async function loginWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  const auth = getFirebaseAuth();

  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (credential === null) {
        const errorMessage = "Error logging in with Google: credential is null";

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

export async function logout() {
  const auth = getFirebaseAuth();

  return auth.signOut();
}

async function storeUser(user: User) {}

export function getCurrentUser() {
  const auth = getFirebaseAuth();

  return auth.currentUser;
}
