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
      // chama a ação de login da sua app
      await (onSubmit ? onSubmit({ usuario, senha }) : Promise.resolve());
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="field">
        <span className="label">Usuário</span>
        <input
          className="input"
          type="text"
          autoComplete="username"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Seu usuário"
          required
        />
      </label>

      <label className="field">
        <span className="label">Senha</span>
        <input
          className="input"
          type="password"
          autoComplete="current-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="••••••••"
          required
        />
      </label>

      <button className="btn" disabled={!usuario || !senha || loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
