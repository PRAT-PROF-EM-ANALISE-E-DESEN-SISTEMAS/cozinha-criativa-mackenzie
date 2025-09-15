import { Info, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";

interface IngredientSubstitutionsProps {
  missingIngredients: string[];
}

// Base de dados de substituiÃ§Ãµes comuns
const substitutions: Record<string, string[]> = {
  "ovos": ["1 banana amassada", "1/4 xÃ­cara de purÃª de maÃ§Ã£", "1 colher de sopa de linhaÃ§a + 3 colheres de Ã¡gua"],
  "leite": ["leite de amÃªndoas", "leite de aveia", "leite de coco", "Ã¡gua + 1 colher de manteiga"],
  "manteiga": ["Ã³leo de coco", "azeite de oliva", "margarina", "purÃª de banana"],
  "aÃ§Ãºcar": ["mel", "aÃ§Ãºcar mascavo", "xarope de bordo", "aÃ§Ãºcar demerara"],
  "farinha de trigo": ["farinha de aveia", "farinha de amÃªndoas", "farinha de arroz"],
  "creme de leite": ["leite + manteiga", "leite de coco", "iogurte grego"],
  "queijo parmesÃ£o": ["queijo pecorino", "queijo grana padano", "nutritional yeast"],
  "vinho branco": ["caldo de legumes", "suco de uva branca", "vinagre de maÃ§Ã£ diluÃ­do"],
  "pancetta": ["bacon", "linguiÃ§a calabresa", "presunto defumado"],
  "alecrim": ["tomilho", "oregano", "manjericÃ£o"],
  "tomilho": ["alecrim", "oregano", "manjericÃ£o"],
  "gengibre": ["canela", "noz-moscada", "gengibre em pÃ³"],
  "leite de coco": ["creme de leite", "leite + Ã³leo de coco", "leite condensado diluÃ­do"],
  "cogumelos": ["berinjela", "abobrinha", "champignon"],
  "anchovas": ["pasta de anchova", "molho inglÃªs", "shoyu"],
  "bacon": ["pancetta", "linguiÃ§a", "presunto defumado"],
  "chocolate meio amargo": ["cacau em pÃ³ + aÃ§Ãºcar", "chocolate ao leite"],
};

export function IngredientSubstitutions({ missingIngredients }: IngredientSubstitutionsProps) {
  if (missingIngredients.length === 0) {
    return null;
  }

  const getSubstitutions = (ingredient: string) => {
    const key = ingredient.toLowerCase();
    // Procura por correspondÃªncias parciais
    for (const [subKey, subs] of Object.entries(substitutions)) {
      if (key.includes(subKey) || subKey.includes(key)) {
        return subs;
      }
    }
    return [];
  };

  const ingredientsWithSubs = missingIngredients
    .map(ingredient => ({
      ingredient,
      substitutions: getSubstitutions(ingredient)
    }))
    .filter(item => item.substitutions.length > 0);

  if (ingredientsWithSubs.length === 0) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          VocÃª nÃ£o tem alguns ingredientes, mas nÃ£o encontramos substituiÃ§Ãµes comuns para eles.
          VocÃª pode tentar adaptar a receita ou procurar os ingredientes no mercado.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5" />
          SugestÃµes de SubstituiÃ§Ãµes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {ingredientsWithSubs.map(({ ingredient, substitutions }) => (
          <div key={ingredient} className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{ingredient}</Badge>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">pode ser substituÃ­do por:</span>
            </div>
            <div className="flex flex-wrap gap-2 ml-4">
              {substitutions.map((sub, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {sub}
                </Badge>
              ))}
            </div>
          </div>
        ))}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            As substituiÃ§Ãµes podem alterar o sabor e textura do prato. Ajuste as quantidades conforme necessÃ¡rio.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

