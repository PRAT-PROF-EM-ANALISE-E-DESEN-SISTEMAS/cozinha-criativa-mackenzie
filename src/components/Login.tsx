import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { Sparkles } from "lucide-react";
import { auth, googleProvider } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");         // <— troquei p/ email
  const [password, setPassword] = useState("");
  const [animate, setAnimate] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // se usuário já está logado (ex.: retorno de redirect), chama onLogin
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) onLogin();
    });
    return () => unsub();
  }, [onLogin]);

  const handleEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Por favor, preencha e-mail e senha.");
      return;
    }
    try {
      setBusy(true);
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (err: any) {
      // mensagens amigáveis
      const code = err?.code as string | undefined;
      let msg = "Não foi possível entrar. Tente novamente.";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
        msg = "Credenciais inválidas.";
      } else if (code === "auth/user-not-found") {
        msg = "Usuário não encontrado.";
      } else if (code === "auth/too-many-requests") {
        msg = "Muitas tentativas. Tente mais tarde.";
      }
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    try {
      setBusy(true);
      await signInWithPopup(auth, googleProvider);
      onLogin();
    } catch {
      // Popup pode ser bloqueado em PWA/iOS → usa redirect
      await signInWithRedirect(auth, googleProvider);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <div
        className={`
          bg-white/90 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-md p-8 flex flex-col items-center
          transform transition-all duration-700 ease-out
          ${animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
        `}
      >
        <Logo className="mb-6" />
        <h2 className="text-3xl font-bold text-primary mb-2 text-center">Bem-vindo</h2>
        <p className="text-muted-foreground mb-6 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" /> Prepare suas receitas favoritas!
        </p>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={busy}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
        >
          {/* ícone do Google em SVG (leve) */}
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10 0 19-7.3 19-20 0-1.3-.1-2.7-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.6 8.4 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 10.1-2 13.7-5.3l-6.3-5.2C29.2 35.7 26.7 36.8 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.6 5.1C9.3 39.6 16.1 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.7-4.9 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-11.1 0-20 8.9-20 20s8.9 20 20 20c10 0 19-7.3 19-20 0-1.3-.1-2.7-.4-3.5z"/>
          </svg>
          {busy ? "Conectando..." : "Continuar com Google"}
        </button>

        {/* divisor */}
        <div className="relative my-4 w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-400">ou</span>
          </div>
        </div>

        {/* E-mail / senha */}
        <form onSubmit={handleEmailPassword} className="w-full flex flex-col gap-4 items-center">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={busy}
            className="mt-2 w-1/2 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-60"
          >
            {busy ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* erros */}
        {error && (
          <div className="mt-3 text-sm text-rose-600 text-center">
            {error}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Novo por aqui? Crie sua conta no app futuramente!
        </div>
      </div>
    </div>
  );
}
