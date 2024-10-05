import { createContext, useContext } from "react";
import { User } from "firebase/auth";

import useFirebaseAuth from "../lib/useFirebaseAuth";

type AuthUserContextType = {
  authUser: User | null;
  authLoading: boolean;
};

const authUserContextType: AuthUserContextType = {
  authUser: null,
  authLoading: true,
};

const authUserContext = createContext(authUserContextType);

export function AuthUserProvider({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth();

  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);
