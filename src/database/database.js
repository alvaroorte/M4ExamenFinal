import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'examen_db', // db name
  'postgres', // username
  '1234', // password
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);
