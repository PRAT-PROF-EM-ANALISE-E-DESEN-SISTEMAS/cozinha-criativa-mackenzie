import { useState, useMemo } from "react";
import { RecipeCard } from "./components/recipe-card";
import type { Recipe } from "./types/recipe";
import { RecipeDetail } from "./components/recipe-detail";
import { RecipeSearch } from "./components/recipe-search";
import { PantryManager } from "./components/pantry-manager";
import { Logo } from "./components/logo";
import { ChefHat, Sparkles } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Login } from "./components/Login"; // import do login

// Dados mock das receitas (mantive todas do seu cÃ³digo original)
const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: "Spaghetti Ã  Carbonara",
    description:
      "Um clÃ¡ssico italiano cremoso e delicioso, feito com ovos, queijo parmesÃ£o, pancetta e pimenta preta.",
    image:
      "https://images.unsplash.com/photo-1632778129004-f142ce499b3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2glMjBpdGFsaWFuJTIwZm9vZHxlbnwxfHx8fDE3NTc1ODM0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 20,
    servings: 4,
    category: "Massas",
    difficulty: "MÃ©dio",
    ingredients: [
      "400g de spaghetti",
      "200g de pancetta ou bacon em cubos",
      "4 ovos inteiros",
      "100g de queijo parmesÃ£o ralado",
      "Pimenta preta moÃ­da na hora",
      "Sal a gosto",
      "2 dentes de alho",
    ],
    instructions: [
      "Cozinhe o spaghetti em Ã¡gua fervente com sal atÃ© ficar al dente.",
      "Enquanto isso, frite a pancetta em uma frigideira grande atÃ© ficar dourada.",
      "Em uma tigela, bata os ovos com o parmesÃ£o e pimenta preta.",
      "Escorra a massa e reserve 1 xÃ­cara da Ã¡gua do cozimento.",
      "Adicione a massa quente Ã  frigideira com a pancetta.",
      "Retire do fogo e misture rapidamente com os ovos batidos.",
      "Adicione Ã¡gua da massa aos poucos atÃ© obter cremosidade.",
      "Sirva imediatamente com parmesÃ£o extra.",
    ],
  },
  {
    id: 2,
    title: "Salada Caesar Fresca",
    description:
      "Salada clÃ¡ssica americana com alface romana, croutons caseiros, parmesÃ£o e molho caesar cremoso.",
    image:
      "https://images.unsplash.com/photo-1654458804670-2f4f26ab3154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwaGVhbHRoeSUyMGZvb2R8ZW58MXx8fHwxNzU3NTY5MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 15,
    servings: 2,
    category: "Saladas",
    difficulty: "FÃ¡cil",
    ingredients: [
      "2 pÃ©s de alface romana",
      "1/2 xÃ­cara de parmesÃ£o ralado",
      "1 xÃ­cara de croutons",
      "2 anchovas",
      "1 dente de alho",
      "1 gema de ovo",
      "2 colheres de sopa de suco de limÃ£o",
      "1/4 xÃ­cara de azeite de oliva",
      "Sal e pimenta a gosto",
    ],
    instructions: [
      "Lave e corte a alface romana em pedaÃ§os.",
      "Prepare o molho batendo alho, anchovas e gema.",
      "Adicione suco de limÃ£o e azeite aos poucos.",
      "Tempere com sal e pimenta.",
      "Misture a alface com o molho.",
      "Adicione croutons e parmesÃ£o.",
      "Sirva imediatamente.",
    ],
  },
  {
    id: 3,
    title: "Bolo de Chocolate Decadente",
    description:
      "Bolo de chocolate intenso e Ãºmido, coberto com ganache cremosa. Perfeito para qualquer celebraÃ§Ã£o.",
    image:
      "https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NTc1MTM0MTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 90,
    servings: 8,
    category: "Sobremesas",
    difficulty: "DifÃ­cil",
    ingredients: [
      "2 xÃ­caras de farinha de trigo",
      "2 xÃ­caras de aÃ§Ãºcar",
      "3/4 xÃ­cara de cacau em pÃ³",
      "2 ovos",
      "1 xÃ­cara de leite",
      "1/2 xÃ­cara de Ã³leo",
      "1 colher de chÃ¡ de fermento",
      "200g de chocolate meio amargo",
      "200ml de creme de leite",
    ],
    instructions: [
      "PrÃ©-aqueÃ§a o forno a 180Â°C.",
      "Misture os ingredientes secos em uma tigela.",
      "Em outra tigela, bata ovos, leite e Ã³leo.",
      "Combine as misturas atÃ© formar uma massa homogÃªnea.",
      "Despeje em forma untada e asse por 40 minutos.",
      "Para a ganache, derreta o chocolate com creme de leite.",
      "Deixe o bolo esfriar completamente.",
      "Cubra com a ganache e sirva.",
    ],
  },
  {
    id: 4,
    title: "Frango Grelhado com Ervas",
    description:
      "Peito de frango suculento marinado com ervas frescas e grelhado na perfeiÃ§Ã£o.",
    image:
      "https://images.unsplash.com/photo-1643594462181-7667928d072e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMG1lYXR8ZW58MXx8fHwxNzU3NTczMDA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 45,
    servings: 4,
    category: "Carnes",
    difficulty: "MÃ©dio",
    ingredients: [
      "4 peitos de frango",
      "2 colheres de sopa de azeite",
      "2 dentes de alho picados",
      "1 colher de chÃ¡ de alecrim",
      "1 colher de chÃ¡ de tomilho",
      "Suco de 1 limÃ£o",
      "Sal e pimenta a gosto",
      "Salsa fresca para decorar",
    ],
    instructions: [
      "Tempere o frango com sal, pimenta e ervas.",
      "Misture azeite, alho e suco de limÃ£o.",
      "Marine o frango por pelo menos 30 minutos.",
      "PrÃ©-aqueÃ§a a grelha ou frigideira.",
      "Grelhe o frango por 6-8 minutos de cada lado.",
      "Verifique se a temperatura interna chegou a 75Â°C.",
      "Deixe descansar por 5 minutos antes de cortar.",
      "Sirva decorado com salsa fresca.",
    ],
  },
  {
    id: 5,
    title: "Sopa de AbÃ³bora Cremosa",
    description:
      "Sopa reconfortante e nutritiva de abÃ³bora com gengibre e leite de coco, perfeita para dias frios.",
    image:
      "https://images.unsplash.com/photo-1645123986577-dfc9359e982b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VwJTIwYm93bCUyMHdhcm0lMjBmb29kfGVufDF8fHx8MTc1NzYwMzQ5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 40,
    servings: 6,
    category: "Sopas",
    difficulty: "FÃ¡cil",
    ingredients: [
      "1kg de abÃ³bora descascada e cortada",
      "1 cebola picada",
      "2 dentes de alho",
      "1 pedaÃ§o pequeno de gengibre",
      "400ml de leite de coco",
      "500ml de caldo de legumes",
      "2 colheres de sopa de azeite",
      "Sal e pimenta a gosto",
      "Sementes de abÃ³bora torradas",
    ],
    instructions: [
      "Refogue a cebola e alho no azeite atÃ© dourar.",
      "Adicione a abÃ³bora e gengibre, refogue por 5 minutos.",
      "Acrescente o caldo de legumes e cozinhe por 20 minutos.",
      "Bata tudo no liquidificador atÃ© ficar cremoso.",
      "Volte Ã  panela e adicione o leite de coco.",
      "Tempere com sal e pimenta.",
      "AqueÃ§a por mais 5 minutos.",
      "Sirva decorado com sementes torradas.",
    ],
  },
  {
    id: 6,
    title: "Risotto de Cogumelos",
    description:
      "Cremoso risotto italiano com mix de cogumelos frescos, parmesÃ£o e um toque de vinho branco.",
    image:
      "https://images.unsplash.com/photo-1634141613544-001d33883517?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBmb29kJTIwY29va2luZ3xlbnwxfHx8fDE3NTc2MDM0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 35,
    servings: 4,
    category: "Vegetariano",
    difficulty: "MÃ©dio",
    ingredients: [
      "300g de arroz arbÃ³reo",
      "300g de mix de cogumelos",
      "1 cebola pequena picada",
      "2 dentes de alho",
      "1/2 xÃ­cara de vinho branco",
      "1 litro de caldo de legumes quente",
      "1/2 xÃ­cara de parmesÃ£o ralado",
      "2 colheres de sopa de manteiga",
      "Azeite, sal e pimenta",
    ],
    instructions: [
      "Refogue os cogumelos em azeite e reserve.",
      "Na mesma panela, refogue cebola e alho.",
      "Adicione o arroz e refogue por 2 minutos.",
      "Acrescente o vinho e deixe evaporar.",
      "Adicione o caldo quente aos poucos, mexendo sempre.",
      "Continue adicionando caldo por 18-20 minutos.",
      "Misture os cogumelos, manteiga e parmesÃ£o.",
      "Tempere e sirva imediatamente.",
    ],
  },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false); // estado para login
  const [selectedRecipe, setSelectedRecipe] =
    useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableIngredients, setAvailableIngredients] =
    useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  const categories = useMemo(() => {
    const allCategories = mockRecipes.map(
      (recipe) => recipe.category,
    );
    return [...new Set(allCategories)];
  }, []);

  const addIngredient = (ingredient: string) => {
    setAvailableIngredients((prev) => [...prev, ingredient]);
  };

  const removeIngredient = (ingredient: string) => {
    setAvailableIngredients((prev) =>
      prev.filter((item) => item !== ingredient),
    );
  };

  const calculateIngredientMatch = (recipe: Recipe) => {
    if (availableIngredients.length === 0) return 0;

    const matchCount = recipe.ingredients.filter((ingredient) =>
      availableIngredients.some(
        (available) =>
          ingredient
            .toLowerCase()
            .includes(available.toLowerCase()) ||
          available
            .toLowerCase()
            .includes(ingredient.toLowerCase()),
      ),
    ).length;

    return (matchCount / recipe.ingredients.length) * 100;
  };

  const filteredRecipes = useMemo(() => {
    let filtered = mockRecipes.filter((recipe) => {
      const matchesSearch =
        recipe.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        recipe.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "" ||
        recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (
      activeTab === "pantry" &&
      availableIngredients.length > 0
    ) {
      filtered = filtered
        .map((recipe) => ({
          ...recipe,
          matchPercentage: calculateIngredientMatch(recipe),
        }))
        .filter((recipe) => recipe.matchPercentage > 0)
        .sort((a, b) => b.matchPercentage - a.matchPercentage);
    }

    return filtered;
  }, [
    searchTerm,
    selectedCategory,
    activeTab,
    availableIngredients,
  ]);

  // Se nÃ£o estiver logado, mostra tela de login
  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Mantive todo o layout do seu cÃ³digo original */}
        <div className="fixed inset-0 pointer-events-none">
          {/* imagens de fundo */}
        </div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={() => setSelectedRecipe(null)}
            availableIngredients={availableIngredients}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Layout principal igual ao original */}
      <div className="fixed inset-0 pointer-events-none">
        {/* imagens de fundo */}
      </div>
      <header className="border-b bg-background/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Logo />
            <PantryManager
              availableIngredients={availableIngredients}
              onAddIngredient={addIngredient}
              onRemoveIngredient={removeIngredient}
            />
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="all">
                Todas as Receitas
              </TabsTrigger>
              <TabsTrigger value="pantry" className="gap-2">
                <ChefHat className="w-4 h-4" />
                Com Meus Ingredientes
                {availableIngredients.length > 0 && (
                  <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                    {availableIngredients.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <RecipeSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
            />
          </Tabs>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="all">
            {filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhuma receita encontrada.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={setSelectedRecipe}
                    availableIngredients={availableIngredients}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pantry">
            {availableIngredients.length === 0 ? (
              <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertDescription>
                  Adicione ingredientes que você tem em casa
                  para ver receitas personalizadas! Clique em
                  "Minha Despensa" acima para começar.
                </AlertDescription>
              </Alert>
            ) : filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhuma receita encontrada com seus
                  ingredientes disponÃ­veis.
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Tente adicionar mais ingredientes ou veja
                  todas as receitas para encontrar algo que
                  goste!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertDescription>
                    Receitas ordenadas pela compatibilidade com
                    seus ingredientes. A porcentagem indica
                    quantos ingredientes vocÃª jÃ¡ tem!
                  </AlertDescription>
                </Alert>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onClick={setSelectedRecipe}
                      availableIngredients={
                        availableIngredients
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
