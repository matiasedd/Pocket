module.exports = {
  development: {
    username: 'user',
    password: '123',
    database: 'pocket',
    host: 'db',
    dialect: 'postgres',
  },
  test: {
    username: 'user',
    password: '123',
    database: 'pocket_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: '5433',
  },
  // TODO: configigurações do ambiente de produção
};
