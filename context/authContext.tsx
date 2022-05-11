import { createContext, useContext } from "react";
import useFirebaseAuth from "../utils/useAuthFirebase";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async (email: string, password: string) => {},
  createUserWithEmailAndPassword: async (email: string, password: string) => {},
  signOut: async () => {},
});

export function AuthUserProvider({ children }: any) {
  const auth = useFirebaseAuth() as any;
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

export const useAuth = () => useContext(authUserContext);
