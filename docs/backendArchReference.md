# Referência da Arquitetura de Backend - v1.1.0

## Motivação

- A arquitetura foi pensada para garantir que a aplicação execute funções de negócio (criar uma conta, atualizar um registro, remover um registro, etc) de forma que cada etapa da execução (roteamento, validação de dados, manipulação dos repositórios, interação com o banco de dados, construção e envio da resposta) possa ser realizada de forma desacoplada.

## Camadas

### Router

- É encarregada de definir as rotas da API e invocar suas respectivas controllers e middlewares.
- Todo router implementa a interface BaseRouter.

### Controller

- Se encarrega de executar a lógica de uma função de negócio (ex: criar uma conta, atualizar ou remover um registro) realizando operações nos repositories e retornando a resposta da requisição.
- Uma controller inicialmente invoca seu respectivo validator através do método _validate_ (se for uma AssertiveController), e executa a função de negócio através do método _handle_.

### Validator

- Um validator é uma função que se encarrega de fazer a validação inicial dos dados recebidos na requisição durante a execução de uma AssertiveController. Se a validação falhar, encerra a requisição enviando a resposta adequada de falha.
- Um validator pode adicionar dados no corpo da requisição conforme necessitar, que serão passados adiante.

### Middleware

- Funções encarregadas de realizar operações que não estão diretamente relacionadas à função de negócio (ex: autorização) antes da execução da controller.

### Repository

- Classes que oferecem métodos para interagir (ler, inserir, atualizar, excluir) com as entidades. Estes métodos serão usados pela controller.

### Model

- Contém a definição das classes das entidades do sistema.
- Todas as models do sistema herdam da classe BaseModel.

### Entity

- Contém as definições das tabelas que são criadas para manter as entidades no banco de dados através do ORM.
- Todas as entities do sistemas herdam da BaseEntity.

### Adapter

- Tem a função de gerar uma função router no padrão Node Express capaz de receber e enviar requisições em uma rota.

## Descrição do fluxo de execução

1. A requisição será recebida por um router (gerado através do AdaptRouter) que pode ou não executar funções de middlewre e finalmente invocar sua respectiva controller.
2. A controller irá invocar seu respectivo validator (através do método _validate_).

- Caso a validação falhe, o validator encerra a requisição e envia a resposta com a mensagem e código de erros adequados.
- Caso a validação seja bem-sucedida, a controller chama seu método _handle_ para executar a função de negócio.

3. O método _handle_ da controller executa o fluxo da função de negócio, realizando operações de leitura/escrita nos repositórios e retornando a resposta da requisição com o corpo e código adequados.
4. A requisição é encerrada pelo adapter, que envia a resposta retornada pela controller.
