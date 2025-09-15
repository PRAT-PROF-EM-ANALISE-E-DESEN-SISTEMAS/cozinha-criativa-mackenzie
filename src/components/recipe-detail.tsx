import { ArrowLeft, Clock, Users, ChefHat, CheckCircle, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { IngredientSubstitutions } from "./ingredient-substitutions";
import type { Recipe } from "../types/recipe";

type RecipeDetailProps = {
  recipe: Recipe;
  onBack: () => void;
  availableIngredients?: string[];
};

export function RecipeDetail({ recipe, onBack, availableIngredients = [] }: RecipeDetailProps) {
  const checkIngredientAvailability = (ingredient: string) =>
    availableIngredients.some(
      (available) =>
        ingredient.toLowerCase().includes(available.toLowerCase()) ||
        available.toLowerCase().includes(ingredient.toLowerCase())
    );

  const availableCount = recipe.ingredients.filter(checkIngredientAvailability).length;
  const missingIngredients = recipe.ingredients.filter((i) => !checkIngredientAvailability(i));

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar às receitas
      </Button>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="aspect-square overflow-hidden rounded-lg mb-6">
            <ImageWithFallback src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{recipe.category}</Badge>
            <Badge
              variant={
                recipe.difficulty === "Fácil"
                  ? "default"
                  : recipe.difficulty === "Médio"
                  ? "secondary"
                  : "destructive"
              }
            >
              {recipe.difficulty}
            </Badge>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span>{recipe.prepTime} minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <span>{recipe.servings} pessoas</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-muted-foreground" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>

          <div>
            <h1 className="mb-4">{recipe.title}</h1>
            <p className="text-muted-foreground mb-6">{recipe.description}</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Ingredientes
                {availableIngredients.length > 0 && (
                  <Badge variant="outline">
                    {availableCount}/{recipe.ingredients.length} disponíveis
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => {
                  const isAvailable = checkIngredientAvailability(ingredient);
                  return (
                    <li key={index} className="flex items-start gap-3">
                      {availableIngredients.length > 0 && (
                        <span className="mt-1">
                          {isAvailable ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                        </span>
                      )}
                      <span className={!isAvailable && availableIngredients.length > 0 ? "text-muted-foreground" : ""}>
                        {ingredient}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>

          {availableIngredients.length > 0 && missingIngredients.length > 0 && (
            <IngredientSubstitutions missingIngredients={missingIngredients} />
          )}

          <Card>
            <CardHeader>
              <CardTitle>Modo de Preparo</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

