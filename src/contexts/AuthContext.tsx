// src/contexts/AuthContext.tsx
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

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
    (async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
        // IMPORTANTE: aguarde o resultado do redirect (se houver)
        await getRedirectResult(auth);
      } catch (e) {
        console.warn("Auth redirect err:", e);
      } finally {
        // só então comece a ouvir o estado
        const unsub = onAuthStateChanged(auth, (u) => {
          setUser(u);
          setLoading(false);
        });
        return () => unsub();
      }
    })();
  }, []);

  const loginWithGoogle = async () => {
    setError(null);
    try {
      // tenta popup
      await signInWithPopup(auth, googleProvider);
    } catch {
      // fallback garantido em produção/PWA/iOS
      await signInWithRedirect(auth, googleProvider);
    }
  };

  const logout = async () => {
    setError(null);
    await signOut(auth);
  };

  const value = useMemo(() => ({ user, loading, error, loginWithGoogle, logout }), [user, loading, error]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider />");
  return ctx;
};
