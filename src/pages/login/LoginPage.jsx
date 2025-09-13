import { AuthCard, Brand, Welcome, LoginForm } from "../../components/login";

export default function LoginPage() {
  async function handleLogin({ usuario, senha }) {
    console.log("login:", { usuario, senha });
  }

  return (
    <main
      className="
        min-h-[100svh] grid place-items-center overflow-x-hidden
        px-4
        bg-[radial-gradient(1200px_800px_at_60%_20%,#ffe4ed_0%,transparent_60%),linear-gradient(160deg,#ffd6e7,#ffffff)]
      "
    >
      <AuthCard>
        <Brand />
        <Welcome />
        <LoginForm onSubmit={handleLogin} />
        <p className="mt-3 text-[11px] sm:text-xs text-gray-400">
          Novo por aqui? <strong>Crie sua conta no app futuramente!</strong>
        </p>
      </AuthCard>
    </main>
  );
}
