import { Sequelize } from 'sequelize';
import dbConfig from './config.js';

const env = process.env.NODE_ENV || 'development';

export const sequelize = new Sequelize(
  dbConfig[env].database,
  dbConfig[env].username,
  dbConfig[env].password,
  {
    dialect: 'postgres',
    host: dbConfig[env].host,
    port: 5433,
  },
);
