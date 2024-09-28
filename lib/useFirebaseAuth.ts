import { useState, useEffect } from "react";
import { User } from "firebase/auth";

import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "./firebase";

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // const authStateChanged =

  // const onAuthStateChanged = (cb) => {
  //   const auth = getFirebaseAuth();
  //   return _onAuthStateChanged(auth, cb);
  // };

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (newUser: User | null) => {
      console.log("userFirebaseAuth - auth state changed: ", newUser);
      if (!newUser) {
        setAuthLoading(false);
        return;
      }

      setAuthLoading(true);
      setAuthUser(newUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    authUser,
    authLoading,
  };
}
