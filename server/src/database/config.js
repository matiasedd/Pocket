module.exports = {
  development: {
    username: 'user',
    password: '123',
    database: 'pocket',
    host: 'db',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: '123',
    database: 'pocket-tmp',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: '5433',
  },
  production: {
    username: 'user',
    password: '123',
    database: 'pocket',
    host: 'db',
    dialect: 'postgres',
  },
};
