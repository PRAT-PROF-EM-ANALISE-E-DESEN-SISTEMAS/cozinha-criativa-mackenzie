import { useState } from "react";

export default function LoginForm({ onSubmit }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!usuario || !senha || loading) return;

    try {
      setLoading(true);
      await (onSubmit ? onSubmit({ usuario, senha }) : Promise.resolve());
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-3">
      <label className="block text-left">
        <span className="block text-xs sm:text-sm text-gray-500 mb-1">Usuário</span>
        <input
          className="
            w-full rounded-xl border border-gray-200
            px-3 py-2.5 text-sm sm:text-base
            placeholder:text-gray-400
            outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30
          "
          type="text"
          autoComplete="username"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Seu usuário"
          required
        />
      </label>

      <label className="block text-left">
        <span className="block text-xs sm:text-sm text-gray-500 mb-1">Senha</span>
        <input
          className="
            w-full rounded-xl border border-gray-200
            px-3 py-2.5 text-sm sm:text-base
            placeholder:text-gray-400
            outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30
          "
          type="password"
          autoComplete="current-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="••••••••"
          required
        />
      </label>

      <button
        className="
          w-full rounded-xl bg-pink-500 text-white font-semibold
          py-2.5 text-sm sm:text-base
          hover:bg-pink-600 transition
          disabled:opacity-60 disabled:cursor-not-allowed
        "
        disabled={!usuario || !senha || loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
