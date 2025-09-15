export type Difficulty = "Fácil" | "Médio" | "Difícil";

export type Recipe = {
  id: number;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  servings: number;
  category: string;
  difficulty: Difficulty;
  ingredients: string[];
  instructions: string[];
  matchPercentage?: number;
};
