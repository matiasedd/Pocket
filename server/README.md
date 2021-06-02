# Pocket API

## Rodando a Aplicação

### Modo Desenvolvimento

- Instancie o container de desenvolvimento com o comando `docker:create`. Se necessário, execute as migrations com o comando `db:migrate` e as seeds com o comando `db:seed`, e inicie o servidor com o comando `dev`. O container de desenvolvimento pode ser removido com o comando `docker:clear`.

### Modo Produção

- Para compilar a aplicação, utilize o comando `build`. O bundle será gerado dentro da pasta */dist*. Rode o bundle utilizando o comando `start`.

## Executando os Testes

### Testes unitários

- Para rodar os testes unitários, utilize o comando `test:unit`, e para rodar os testes de integração, utilize o comando `test:integration`.