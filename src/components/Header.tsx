import { Logo } from "./logo";
import { PantryManager } from "./pantry-manager";
import { useAuth } from "../contexts/AuthContext";

type HeaderProps = {
  availableIngredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
  /** Chamada após o logout (ex.: setLoggedIn(false)) */
  onAfterLogout?: () => void;
  /** Conteúdo extra mostrado abaixo da barra (ex.: seus Tabs + Search) */
  children?: React.ReactNode;
};

function initialsFrom(text?: string | null) {
  if (!text) return "U";
  const base = text.includes("@") ? text.split("@")[0] : text;
  const parts = base.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";
  const inits = (first + second || first || base[0] || "U").toUpperCase();
  return inits;
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
    await logout();           // sai do Firebase (Google OU senha nativa)
    onAfterLogout?.();        // volta para a tela de login do seu app, se precisar
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Logo />

          <div className="flex items-center gap-4">
            <PantryManager
              availableIngredients={availableIngredients}
              onAddIngredient={onAddIngredient}
              onRemoveIngredient={onRemoveIngredient}
            />

            {/* bloco do usuário */}
            <div className="flex items-center gap-3">
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

              <button
                onClick={handleLogout}
                className="text-sm text-primary hover:underline"
              >
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo injetado (Tabs/Search) */}
        {children}
      </div>
    </header>
  );
}
