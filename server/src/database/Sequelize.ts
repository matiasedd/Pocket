import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('pocket', 'user', '123', {
  dialect: 'postgres',
  host: '/db',
});
