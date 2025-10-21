// src/App.tsx
import { useState, useMemo } from "react";
import Header from "./components/Header";

import { RecipeCard } from "./components/recipe-card";
import { RecipeDetail } from "./components/recipe-detail";
import { RecipeSearch } from "./components/recipe-search";
import { Login } from "./components/Login";

import { ChefHat, Sparkles } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { Alert, AlertDescription } from "./components/ui/alert";

import type { Recipe } from "./types/recipe";

// Dados mock das receitas (mantive todas do seu código original)
const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: "Spaghetti à Carbonara",
    description:
      "Um clássico italiano cremoso e delicioso, feito com ovos, queijo parmesão, pancetta e pimenta-do-reino.",
    image:
      "https://images.unsplash.com/photo-1632778129004-f142ce499b3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2glMjBpdGFsaWFuJTIwZm9vZHxlbnwxfHx8fDE3NTc1ODM0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 20,
    servings: 4,
    category: "Massas",
    difficulty: "Médio",
    ingredients: [
      "400 g de spaghetti",
      "200 g de pancetta ou bacon em cubos",
      "4 ovos inteiros",
      "100 g de queijo parmesão ralado",
      "Pimenta-do-reino moída na hora",
      "Sal a gosto",
      "2 dentes de alho"
    ],
    instructions: [
      "Cozinhe o spaghetti em água fervente com sal até ficar al dente.",
      "Enquanto isso, frite a pancetta em uma frigideira grande até dourar.",
      "Em uma tigela, bata os ovos com o parmesão e pimenta-do-reino.",
      "Escorra a massa e reserve 1 xícara da água do cozimento.",
      "Adicione a massa quente à frigideira com a pancetta.",
      "Retire do fogo e misture rapidamente com os ovos batidos.",
      "Adicione a água da massa aos poucos até obter cremosidade.",
      "Sirva imediatamente com parmesão extra."
    ]
  },
  {
    id: 2,
    title: "Salada Caesar Fresca",
    description:
      "Salada clássica americana com alface romana, croutons caseiros, parmesão e molho Caesar cremoso.",
    image:
      "https://images.unsplash.com/photo-1654458804670-2f4f26ab3154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwaGVhbHRoeSUyMGZvb2R8ZW58MXx8fHwxNzU3NTY5MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 15,
    servings: 2,
    category: "Saladas",
    difficulty: "Fácil",
    ingredients: [
      "2 pés de alface romana",
      "1/2 xícara de parmesão ralado",
      "1 xícara de croutons",
      "2 anchovas",
      "1 dente de alho",
      "1 gema de ovo",
      "2 colheres de sopa de suco de limão",
      "1/4 xícara de azeite de oliva",
      "Sal e pimenta a gosto"
    ],
    instructions: [
      "Lave e corte a alface romana em pedaços.",
      "Prepare o molho batendo alho, anchovas e a gema.",
      "Adicione o suco de limão e o azeite aos poucos.",
      "Tempere com sal e pimenta.",
      "Misture a alface com o molho.",
      "Adicione croutons e parmesão.",
      "Sirva imediatamente."
    ]
  },
  {
    id: 3,
    title: "Bolo de Chocolate Decadente",
    description:
      "Bolo de chocolate intenso e úmido, coberto com ganache cremosa. Perfeito para qualquer celebração.",
    image:
      "https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NTc1MTM0MTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 90,
    servings: 8,
    category: "Sobremesas",
    difficulty: "Difícil",
    ingredients: [
      "2 xícaras de farinha de trigo",
      "2 xícaras de açúcar",
      "3/4 xícara de cacau em pó",
      "2 ovos",
      "1 xícara de leite",
      "1/2 xícara de óleo",
      "1 colher de chá de fermento",
      "200 g de chocolate meio amargo",
      "200 ml de creme de leite"
    ],
    instructions: [
      "Preaqueça o forno a 180°C.",
      "Misture os ingredientes secos em uma tigela.",
      "Em outra tigela, bata os ovos, o leite e o óleo.",
      "Combine as misturas até formar uma massa homogênea.",
      "Despeje em forma untada e asse por cerca de 40 minutos.",
      "Para a ganache, derreta o chocolate com o creme de leite.",
      "Deixe o bolo esfriar completamente.",
      "Cubra com a ganache e sirva."
    ]
  },
  {
    id: 4,
    title: "Frango Grelhado com Ervas",
    description:
      "Peito de frango suculento marinado com ervas frescas e grelhado à perfeição.",
    image:
      "https://images.unsplash.com/photo-1643594462181-7667928d072e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMG1lYXR8ZW58MXx8fHwxNzU3NTczMDA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 45,
    servings: 4,
    category: "Carnes",
    difficulty: "Médio",
    ingredients: [
      "4 peitos de frango",
      "2 colheres de sopa de azeite",
      "2 dentes de alho picados",
      "1 colher de chá de alecrim",
      "1 colher de chá de tomilho",
      "Suco de 1 limão",
      "Sal e pimenta a gosto",
      "Salsa fresca para decorar"
    ],
    instructions: [
      "Tempere o frango com sal, pimenta e as ervas.",
      "Misture o azeite, o alho e o suco de limão.",
      "Marine o frango por pelo menos 30 minutos.",
      "Preaqueça a grelha ou frigideira.",
      "Grelhe o frango por 6–8 minutos de cada lado.",
      "Verifique se a temperatura interna chegou a 75°C.",
      "Deixe descansar por 5 minutos antes de cortar.",
      "Sirva decorado com salsa fresca."
    ]
  },
  {
    id: 5,
    title: "Sopa de Abóbora Cremosa",
    description:
      "Sopa reconfortante e nutritiva de abóbora com gengibre e leite de coco, perfeita para dias frios.",
    image:
      "https://images.unsplash.com/photo-1645123986577-dfc9359e982b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VwJTIwYm93bCUyMHdhcm0lMjBmb29kfGVufDF8fHx8MTc1NzYwMzQ5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 40,
    servings: 6,
    category: "Sopas",
    difficulty: "Fácil",
    ingredients: [
      "1 kg de abóbora descascada e cortada",
      "1 cebola picada",
      "2 dentes de alho",
      "1 pedaço pequeno de gengibre",
      "400 ml de leite de coco",
      "500 ml de caldo de legumes",
      "2 colheres de sopa de azeite",
      "Sal e pimenta a gosto",
      "Sementes de abóbora torradas"
    ],
    instructions: [
      "Refogue a cebola e o alho no azeite até dourar.",
      "Adicione a abóbora e o gengibre, e refogue por 5 minutos.",
      "Acrescente o caldo de legumes e cozinhe por 20 minutos.",
      "Bata tudo no liquidificador até ficar cremoso.",
      "Volte à panela e adicione o leite de coco.",
      "Tempere com sal e pimenta.",
      "Aqueça por mais 5 minutos.",
      "Sirva decorado com as sementes torradas."
    ]
  },
  {
    id: 6,
    title: "Risotto de Cogumelos",
    description:
      "Cremoso risotto italiano com mix de cogumelos frescos, parmesão e um toque de vinho branco.",
    image:
      "https://images.unsplash.com/photo-1634141613544-001d33883517?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBmb29kJTIwY29va2luZ3xlbnwxfHx8fDE3NTc2MDM0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 35,
    servings: 4,
    category: "Vegetariano",
    difficulty: "Médio",
    ingredients: [
      "300 g de arroz arbóreo",
      "300 g de mix de cogumelos",
      "1 cebola pequena picada",
      "2 dentes de alho",
      "1/2 xícara de vinho branco",
      "1 litro de caldo de legumes quente",
      "1/2 xícara de parmesão ralado",
      "2 colheres de sopa de manteiga",
      "Azeite, sal e pimenta"
    ],
    instructions: [
      "Refogue os cogumelos em azeite e reserve.",
      "Na mesma panela, refogue a cebola e o alho.",
      "Adicione o arroz e refogue por 2 minutos.",
      "Acrescente o vinho e deixe evaporar.",
      "Adicione o caldo quente aos poucos, mexendo sempre.",
      "Continue adicionando caldo por 18–20 minutos.",
      "Misture os cogumelos, a manteiga e o parmesão.",
      "Tempere e sirva imediatamente."
    ]
  }
]
;

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false); // estado para login
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableIngredients, setAvailableIngredients] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  const categories = useMemo(() => {
    const allCategories = mockRecipes.map((recipe) => recipe.category);
    return [...new Set(allCategories)];
  }, []);

  const addIngredient = (ingredient: string) => {
    setAvailableIngredients((prev) => [...prev, ingredient]);
  };

  const removeIngredient = (ingredient: string) => {
    setAvailableIngredients((prev) => prev.filter((item) => item !== ingredient));
  };

  const calculateIngredientMatch = (recipe: Recipe) => {
    if (availableIngredients.length === 0) return 0;

    const matchCount = recipe.ingredients.filter((ingredient) =>
      availableIngredients.some(
        (available) =>
          ingredient.toLowerCase().includes(available.toLowerCase()) ||
          available.toLowerCase().includes(ingredient.toLowerCase())
      )
    ).length;

    return (matchCount / recipe.ingredients.length) * 100;
  };

  const filteredRecipes = useMemo(() => {
    let filtered = mockRecipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "" || recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (activeTab === "pantry" && availableIngredients.length > 0) {
      filtered = filtered
        .map((recipe) => ({
          ...recipe,
          matchPercentage: calculateIngredientMatch(recipe),
        }))
        .filter((recipe: any) => recipe.matchPercentage > 0)
        .sort((a: any, b: any) => b.matchPercentage - a.matchPercentage);
    }

    return filtered;
  }, [searchTerm, selectedCategory, activeTab, availableIngredients]);

  // Se não estiver logado, mostra tela de login
  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  // Página de detalhes
  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">{/* imagens de fundo */}</div>
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

  // Home
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">{/* imagens de fundo */}</div>

      {/* Header externo (email, avatar, logout) + Tabs/Search como children */}
      <Header
        availableIngredients={availableIngredients}
        onAddIngredient={addIngredient}
        onRemoveIngredient={removeIngredient}
        onAfterLogout={() => setLoggedIn(false)}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todas as Receitas</TabsTrigger>
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
      </Header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="all">
            {filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhuma receita encontrada.</p>
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
                  Adicione ingredientes que você tem em casa para ver receitas personalizadas! Clique em
                  "Minha Despensa" acima para começar.
                </AlertDescription>
              </Alert>
            ) : filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhuma receita encontrada com seus ingredientes disponíveis.
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Tente adicionar mais ingredientes ou veja todas as receitas para encontrar algo que goste!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertDescription>
                    Receitas ordenadas pela compatibilidade com seus ingredientes. A porcentagem indica quantos
                    ingredientes você já tem!
                  </AlertDescription>
                </Alert>
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
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
