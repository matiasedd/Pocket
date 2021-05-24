# Pocket API

## Rodando a Aplicação

## Modo de teste

- Instancie o container de teste com o comando `docker:test:create` e inicie o servidor com o comando `test`. O container de teste pode ser removido com o comando `docker:test:clear`.

### Modo Desenvolvimento

- Utilize o comando `docker-compose up` para iniciar o servidor. As migrations e seeds serão executadas automaticamente.

### Modo Produção

- Para compilar a aplicação, utilize o comando `build`. O bundle será gerado dentro da pasta */dist*. Rode o bundle utilizando o comando `start`.

## Executando os Testes

### Testes unitários

- Para rodar os testes unitários, utilize o comando `test`.