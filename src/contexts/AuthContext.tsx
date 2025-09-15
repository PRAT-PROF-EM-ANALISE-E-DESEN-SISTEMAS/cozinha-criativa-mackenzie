import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, googleProvider } from "../lib/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
  signOut,
  type User as FirebaseUser, // <— evita conflito de nomes
} from "firebase/auth";

type Ctx = {
  user: FirebaseUser | null;
  loading: boolean;
  error: string | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<Ctx | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // garante que a sessão persista (tabs/refresh/PWA)
    setPersistence(auth, browserLocalPersistence).catch(() => {});

    // completa login via redirect (iOS/PWA)
    getRedirectResult(auth).catch(() => {});

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const loginWithGoogle = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      // popup pode falhar em iOS/PWA → fallback
      await signInWithRedirect(auth, googleProvider);
    }
  };

  const logout = async () => {
    setError(null);
    await signOut(auth);
  };

  const value = useMemo(
    () => ({ user, loading, error, loginWithGoogle, logout }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider />");
  return ctx;
};
