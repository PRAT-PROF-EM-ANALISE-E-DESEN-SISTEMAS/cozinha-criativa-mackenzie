import { Clock, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  servings: number;
  category: string;
  difficulty: "FÃ¡cil" | "MÃ©dio" | "DifÃ­cil";
  ingredients: string[];
  instructions: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  availableIngredients?: string[];
}

export function RecipeCard({ recipe, onClick, availableIngredients = [] }: RecipeCardProps) {
  // Calcula quantos ingredientes o usuÃ¡rio tem
  const checkIngredientAvailability = (ingredient: string) => {
    return availableIngredients.some(available => 
      ingredient.toLowerCase().includes(available.toLowerCase()) || 
      available.toLowerCase().includes(ingredient.toLowerCase())
    );
  };

  const availableCount = availableIngredients.length > 0 
    ? recipe.ingredients.filter(checkIngredientAvailability).length 
    : 0;
  const matchPercentage = availableIngredients.length > 0 
    ? Math.round((availableCount / recipe.ingredients.length) * 100) 
    : 0;
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => onClick(recipe)}
    >
      <div className="aspect-video overflow-hidden">
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="line-clamp-2">{recipe.title}</h3>
          <div className="flex gap-1 ml-2">
            <Badge variant="secondary" className="whitespace-nowrap">
              {recipe.category}
            </Badge>
            {availableIngredients.length > 0 && (
              <Badge 
                variant={matchPercentage >= 80 ? "default" : matchPercentage >= 50 ? "secondary" : "outline"}
                className="whitespace-nowrap"
              >
                {matchPercentage}%
              </Badge>
            )}
          </div>
        </div>
        <p className="text-muted-foreground mb-3 line-clamp-2">{recipe.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{recipe.prepTime}min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{recipe.servings} pessoas</span>
            </div>
          </div>
          <Badge variant={recipe.difficulty === "FÃ¡cil" ? "default" : recipe.difficulty === "MÃ©dio" ? "secondary" : "destructive"}>
            {recipe.difficulty}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
