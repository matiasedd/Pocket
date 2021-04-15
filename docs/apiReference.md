# API Reference

## Usuários

<strong>GET Users</strong> - <em>Listar todos os usuários cadastrados.</em>

```
GET http://localhost:3333/users
```

Resposta esperdada:

```
[
  {
    "user_id": "0f566d84-00dc-46f4-8c03-9058223729a6",
    "first_name": "Edison",
    "last_name": "Matias",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  {
    "user_id": "27e84daa-d56f-4d4f-be19-779eb19e99aa",
    "first_name": "Murilo",
    "last_name": "Henrique",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
]
```

<strong>GET User</strong> - <em>Listar um usuário específico a partir de seu ID.</em>

```
GET http://localhost:3333/users/:userid
```

Resposta esperdada:

```
{
  "user_id": "27e84daa-d56f-4d4f-be19-779eb19e99aa",
  "first_name": "Murilo",
  "last_name": "Henrique",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

<strong>ADD User</strong> - <em>Adicionar um novo usuário.</em>

```
POST http://localhost:3333/users
```

Body:

```
{
  "first_name": "Edison",
  "last_name": "Matias",
  "email": "edison.matias@gmail.com",
  "password": "loremipsum"
}
```

Resposta esperada:

```
{
  "user_id": "0f566d84-00dc-46f4-8c03-9058223729a6", //uuidv4
  "first_name": "Edison",
  "last_name": "Matias",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

<strong>UPDATE User</strong> - <em>Atualizar dados de um usuário existente.</em>

```
PUT http://localhost:3333/users/:userid
```

Body:

```
{
  "last_name": "Gomes"
}
```

Resposta esperada:

```
{
  "user_id": "27e84daa-d56f-4d4f-be19-779eb19e99aa",
  "first_name": "Murilo",
  "last_name": "Gomes",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

<strong>DELETE User</strong> - <em>Excluir um usuário existente.</em>

```
DELETE http://localhost:3333/users/:userid
```

Resposta esperdada:

```
{
  "status": 200
}
```

## Transações

<strong>GET Transactions</strong> - <em>Listar todas as transações de um usuário específico.</em>

```
GET http://localhost:3333/users/:userid/transactions
```

Responsta esperada:

```
[
  {
    "transaction_id": "6aaddef0-528b-4b92-b9e7-c6639f8baf1a",
    "user_id": "0f566d84-00dc-46f4-8c03-9058223729a6",
    "title": "Compras do mês",
    "category": "Mercado",
    "value": -224.85,
    "type": "expense",
    "description": "Lista de compras: 1-...",
    "is_fixed": false,
    "created_at": "2021-04-15T12:00:00.000Z",
    "updated_at": "2021-04-15T12:00:00.000Z"
  },
  {
    "transaction_id": "3f238d44-26a7-4a08-a9be-92668bcace3b",
    "user_id": "0f566d84-00dc-46f4-8c03-9058223729a6",
    "title": "Empréstimo",
    "category": "Empréstimos",
    "value": 155.50,
    "type": "income",
    "description": null,
    "is_fixed": true,
    "created_at": "2021-04-15T12:00:00.000Z",
    "updated_at": "2021-04-15T12:00:00.000Z"
  }
]
```

<strong>GET Transaction</strong> - <em>Listar uma transação específica a partir dos IDs de usuário e transação.</em>

```
GET http://localhost:3333/users/:userid/transactions/:transactionid
```

Resposta esperada:

```
{
  "transaction_id": "3f238d44-26a7-4a08-a9be-92668bcace3b",
  "user_id": "0f566d84-00dc-46f4-8c03-9058223729a6",
  "title": "Empréstimo",
  "category": "Empréstimos",
  "value": 155.50,
  "type": "income",
  "description": null,
  "is_fixed": true,
  "created_at": "2021-04-15T12:00:00.000Z",
  "updated_at": "2021-04-15T12:00:00.000Z"
}
```

<strong>ADD Transaction</strong> - <em>Adicionar uma nova transação.</em>

```
POST http://localhost:3333/users/:userid/transactions
```

Body:

```
{
  "user_id": "0f566d84-00dc-46f4-8c03-9058223729a6"
  "title": "Café expresso",
  "category": "Alimentação",
  "value": -10.90,
  "type": "expense"
}
```

Resultado esperado:

```
{
  "transaction_id": "b4342d43-2d31-40fd-ab3e-a09ca942171d", //uuidv4
  "user_id": "0f566d84-00dc-46f4-8c03-9058223729a6",
  "title": "Café expresso",
  "category": "Alimentação",
  "value": -10.90,
  "type": "expense",
  "description": null,
  "is_fixed": false,
  "created_at": "2021-04-15T12:00:00.000Z",
  "updated_at": "2021-04-15T12:00:00.000Z"
}
```

<strong>UPDATE Transaction</strong> - <em>Atualizar dados de uma transação existente.</em>

```
PUT http://localhost:3333/users/:userid/transactions/:transactionid
```

Body:

```
{
  "value": -15.90,
  "description": "Cafeteria São Pedro"
}
```

Resultado esperado:

```
{
  "transaction_id": "3f238d44-26a7-4a08-a9be-92668bcace3b",
  "user_id": "0f566d84-00dc-46f4-8c03-9058223729a6",
  "title": "Café expresso",
  "category": "Alimentação",
  "value": -15.90,
  "type": "expense",
  "description": "Cafeteria São Pedro",
  "is_fixed": false,
  "created_at": "2021-04-15T12:00:00.000Z",
  "updated_at": "2021-04-15T12:00:00.000Z"
}
```

<strong>DELETE Transaction</strong> - <em>Excluir uma transação existente.</em>

```
DELETE http://localhost:3333/users/:userid/transactions/:transactionid
```

Resultado esperado:

```
{
  status: 200
}
```
