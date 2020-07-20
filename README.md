## API Pokedex

A API consiste em duas partes,  a primeira parte consiste no login e nos dados de pokemons. 
A segunda parte consiste naquela após ter sido feito o login onde o usuário terá um token JWT em todas as suas requisições, esse token terá uma validade de 1 dia apenas.

Existe uma controller de migração "MigrationController" e nela se encontra toda a regra aplicada para se migrar os dados de JSON para uma Banco de Dados SQL. As rotas de migração ainda se encontram na aplicação comentadas, se precisar apenas as decomentem e deixem ela rodar o json que se encontra na raiz do projeto "/pokemons.json" que é uma copia em JSON do excel. 

O usuário não pode ser alterado, para manter a usabilidade da aplicação web. 


> ROTAS

| Método | Rota |  Função | JWT |
|--|--|--|--|
| GET | / | Traz os pokemons | FALSE |
| GET | /pokemon/:name | Traz os dados de um pokemon especifico | FALSE |
| POST | /user/login | Faz login na aplicação | FALSE |
| POST | /user| Cria um usuário | FALSE |
| GET| /ad/pokemons | Traz os pokemons com alguns dados a mais (com o id que não apresento e não utilizo na aplicação web) | TRUE |
| GET| /ad/pokemons/:id | Traz os dados de um único pokemon  | TRUE | 
| POST| /pokemons/| Cria um pokemon  | TRUE | 
| PUT| /pokemons/| Atualiza os dados de um pokemon  | TRUE | 
| DELETE| /pokemons/| Altera a frag de "active" para "deleted" (por motivos de segurança prefiro não apagar nenhum dado e apenas não exibi-lo mais e ainda mante-lo em banco)  | TRUE | 
| GET| /types| Lista todos os Types  | TRUE | 
| GET| /types/:id | Traz um único Type  | TRUE | 
| PUT| /types/:id | Atualiza um Type  | TRUE | 
| GET| /weathers| Lista todos os Climas  | TRUE | 
| GET| /weathers/:id | Traz um único Climas  | TRUE |
| PUT| /weathers/:id | Atualiza um Climas  | TRUE |
| GET| /ad/type/weather | Lista os tipos e os Climas em uma unica requisição, (para a aplicação não fazer mais de um requisição para pegar esses dados)   | TRUE | 
| GET/POST | /migration/types | Migra os tipos para a tabela de types (ROTA COMENTADA) | TRUE | 
| PUT/POST | /migration/weather | Migra os climas para a tabela Weathers  (ROTA COMENTADA) | TRUE | 
| GET/POST | /migration/pokemons | Faz a migração dos pokemons, criando o relacionamento dos tipos e dos climas RODE PRIMEIRO AS OUTRAS DUAS (ROTA COMENTADA) | TRUE | 






