import { Logo } from "./logo";
import { PantryManager } from "./pantry-manager";
import { useAuth } from "../contexts/AuthContext";

type HeaderProps = {
  availableIngredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
  /** Chamada após o logout (ex.: setLoggedIn(false)) */
  onAfterLogout?: () => void;
  /** Conteúdo extra mostrado abaixo da barra (ex.: Abas + Busca) */
  children?: React.ReactNode;
};

function initialsFrom(text?: string | null) {
  if (!text) return "U";
  const base = text?.includes("@") ? text.split("@")[0] : text!;
  const parts = base.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return (first + second || first || base[0] || "U").toUpperCase();
}

export default function Header({
  availableIngredients,
  onAddIngredient,
  onRemoveIngredient,
  onAfterLogout,
  children,
}: HeaderProps) {
  const { user, logout } = useAuth();

  const providerId = user?.providerData?.[0]?.providerId;
  const providerLabel =
    providerId === "google.com" ? "Google" :
    providerId === "password"   ? "E-mail" :
    "Conta";

  const display = user?.displayName ?? user?.email ?? "Usuário";
  const avatar = user?.photoURL ?? "";
  const initials = initialsFrom(display);

  const handleLogout = async () => {
    await logout();           // Sai do Firebase (Google OU senha nativa)
    onAfterLogout?.();        // Retorna para a tela de login do app, se necessário
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-4 py-6">
        {/* Linha 1: Título (Logo) + Sair ao lado */}
        <div className="flex items-center justify-between mb-4">
          <Logo />
          <button
            onClick={handleLogout}
            className="text-sm text-primary hover:underline"
            aria-label="Sair da conta"
          >
            Sair
          </button>
        </div>

        {/* Linha 2: Minha Despensa (abaixo do título e do Sair) + bloco do usuário à direita em telas médias+ */}
        <div className="flex items-start gap-4 mb-6">
          <PantryManager
            availableIngredients={availableIngredients}
            onAddIngredient={onAddIngredient}
            onRemoveIngredient={onRemoveIngredient}
          />

          {/* Bloco do usuário (fica à direita quando houver espaço) */}
          <div className="ml-auto hidden sm:flex items-center gap-3">
            {avatar ? (
              <img
                src={avatar}
                alt={display}
                className="h-8 w-8 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary grid place-items-center text-sm font-semibold">
                {initials}
              </div>
            )}
            <div className="hidden sm:flex flex-col">
              <span className="text-sm text-muted-foreground leading-none">{display}</span>
              <span className="text-[11px] text-primary/80 leading-none">{providerLabel}</span>
            </div>
          </div>
        </div>

        {/* Conteúdo injetado (Abas/Busca) */}
        {children}
      </div>
    </header>
  );
}
