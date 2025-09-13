
import "./login.css";
import { AuthCard, Brand, Welcome, LoginForm } from "../../components/login";


export default function LoginPage() {
  async function handleLogin({ usuario, senha }) {
    console.log("login:", { usuario, senha });
  }

  return (
    <main className="login-bg">
      <AuthCard>
        <Brand />
        <Welcome />
        <LoginForm onSubmit={handleLogin} />
        <p className="footer">
          Novo por aqui? <strong>Crie sua conta no app futuramente!</strong>
        </p>
      </AuthCard>
    </main>
  );
}
