import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase";

interface UserContextProps {
  createUser: (email: string, password: string) => Promise<UserCredential>;
  user: User | null | undefined;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signInGoogle: () => Promise<UserCredential>;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const createUser = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const signInGoogle = () => signInWithPopup(auth, googleProvider);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);
  return (
    <UserContext.Provider
      value={{ createUser, user, logout, signIn, signInGoogle }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
