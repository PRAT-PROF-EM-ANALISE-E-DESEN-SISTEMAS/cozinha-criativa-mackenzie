// src/types/recipe.ts
export type Recipe = {
  id: number;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  servings: number;
  category: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  matchPercentage?: number;
};
