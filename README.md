# cozinha-criativa-mackenzie
O Cozinha Criativa ajuda você a decidir o que cozinhar com os itens disponíveis em casa. Informe os ingredientes e receba sugestões de receitas que aproveitam ao máximo o que já está na despensa, promovendo praticidade, economia e criatividade na cozinha.


### Diagrama de Classes

```mermaid
%% Layout: topo (entidades) -> meio (junções)
classDiagram
direction TB

%% ===== Linha do topo (entidades principais) =====
class Usuario {
  +id: long
  +nome: string
  +email: string
  +restricoesAlimentares: string[]
}
class Receita {
  +id: long
  +titulo: string
  +descricao: string
  +categoria: string
  +modoPreparo: string
  +imagemUrl: string
  +tempoPreparoMin: int
  +porcoes: int
  +dificuldade: string
}
class Ingrediente {
  +id: long
  +nome: string
  +categoria: string
  +perecivel: boolean
  +unidadePadrao: string
}

%% ===== Linha do meio (junções N..N) =====
class Favorito {
  +usuarioId: long
  +receitaId: long
}
class ReceitaIngrediente {
  +receitaId: long
  +ingredienteId: long
  +quantidade: string
}

%% ===== Relacionamentos (essenciais) =====
Usuario "1" *-- "0..*" Favorito : possui
Receita "1" *-- "0..*" Favorito : é favoritada por

Receita "1" *-- "1..*" ReceitaIngrediente : compõe
Ingrediente "1" *-- "0..*" ReceitaIngrediente : participa
