import { useState, useEffect } from "react";
import { Logo } from "./logo";
import { Sparkles } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [animate, setAnimate] = useState(false); // controla animaÃ§Ã£o

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50); // delay para iniciar animaÃ§Ã£o
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    } else {
      alert("Por favor, preencha usuário e senha.");
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
        <h2 className="text-3xl font-bold text-primary mb-4 text-center">
          Bem-vindo
        </h2>
        <p className="text-muted-foreground mb-6 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" /> Prepare suas receitas
          favoritas!
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 items-center"
        >
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            className="mt-2 w-1/2 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition flex items-center justify-center"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Novo por aqui? Crie sua conta no app futuramente!
        </div>
      </div>
    </div>
  );
}
