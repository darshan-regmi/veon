"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

/* -----------------------
   Custom User Profile Type
--------------------------*/
interface UserProfile {
  email: string;
  displayName?: string;
  photoURL?: string;
  role: string;
  createdAt: Date;
}

/* -----------------------
   Auth Context Interface
--------------------------*/
interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* -----------------------
        Provider
--------------------------*/
export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  /* --------------------------------
       Listen for Auth State Change
  ----------------------------------*/
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (u) {
        const userDocRef = doc(db, "users", u.uid);
        const userDoc = await getDoc(userDocRef);

        const data = userDoc.data();

        if (data) {
          const profile: UserProfile = {
            email: data.email,
            displayName: data.displayName,
            photoURL: data.photoURL,
            role: data.role,
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate()
              : data.createdAt,
          };

          setUserProfile(profile);
          setIsAdmin(data.role === "admin");
        }
      } else {
        setUserProfile(null);
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /* --------------------------------
           Auth Functions
  ----------------------------------*/

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
      role: "user",
      createdAt: new Date(),
    });
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    const ref = doc(db, "users", userCredential.user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        role: "user",
        createdAt: new Date(),
      });
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  /* --------------------------------
           Memoized Context Value
  ----------------------------------*/
  const value = useMemo(
    () => ({
      user,
      isAdmin,
      userProfile,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
    }),
    [user, isAdmin, userProfile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* -----------------------
         Hook
--------------------------*/
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
