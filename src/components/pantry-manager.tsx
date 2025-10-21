import { useState } from "react";
import { Plus, X, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface PantryManagerProps {
  availableIngredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
}

const commonIngredients = [
  "Ovos", "Leite", "Farinha de trigo", "Açúcar", "Sal", "Pimenta",
  "Azeite de oliva", "Óleo", "Cebola", "Alho", "Tomate", "Arroz",
  "Feijão", "Frango", "Carne moída", "Queijo", "Manteiga", "Limão",
  "Batata", "Cenoura", "Pimentão", "Macarrão", "Pão", "Iogurte"
];


export function PantryManager({ 
  availableIngredients, 
  onAddIngredient, 
  onRemoveIngredient 
}: PantryManagerProps) {
  const [newIngredient, setNewIngredient] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddIngredient = () => {
    if (newIngredient.trim() && !availableIngredients.includes(newIngredient.trim())) {
      onAddIngredient(newIngredient.trim());
      setNewIngredient("");
    }
  };

  const handleAddCommonIngredient = (ingredient: string) => {
    if (!availableIngredients.includes(ingredient)) {
      onAddIngredient(ingredient);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddIngredient();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Package className="w-4 h-4" />
          Minha Despensa ({availableIngredients.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Gerenciar Minha Despensa
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Adicionar novo ingrediente */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Adicionar Ingrediente</label>
            <div className="flex gap-2">
              <Input
                placeholder="Digite um ingrediente..."
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button onClick={handleAddIngredient} disabled={!newIngredient.trim()}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Ingredientes comuns */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Ingredientes Comuns</label>
            <div className="flex flex-wrap gap-2">
              {commonIngredients.map((ingredient) => (
                <Button
                  key={ingredient}
                  variant={availableIngredients.includes(ingredient) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAddCommonIngredient(ingredient)}
                  disabled={availableIngredients.includes(ingredient)}
                >
                  {ingredient}
                </Button>
              ))}
            </div>
          </div>

          {/* Ingredientes atuais */}
          <div className="space-y-3">
            <label className="text-sm font-medium">
              Meus Ingredientes ({availableIngredients.length})
            </label>
            {availableIngredients.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Nenhum ingrediente adicionado ainda. Comece adicionando ingredientes que vocÃª tem em casa!
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {availableIngredients.map((ingredient) => (
                  <Badge key={ingredient} variant="secondary" className="gap-1">
                    {ingredient}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto w-auto p-0 hover:bg-transparent"
                      onClick={() => onRemoveIngredient(ingredient)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

