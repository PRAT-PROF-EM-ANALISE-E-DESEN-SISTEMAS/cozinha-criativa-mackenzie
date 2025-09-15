// src/types/recipe.ts
export const DIFFICULTY = {
  Facil: "Fácil",
  Medio: "Médio",
  Dificil: "Difícil",
} as const;

export type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

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
