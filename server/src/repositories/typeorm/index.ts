import { createConnection } from 'typeorm';

createConnection({
  type: 'sqlite',
  database: __dirname + '/testDB.sqlite',
  entities: [__dirname + '/entities/*.ts'],
  synchronize: true,
  logging: false,
});

export { default as usersRepository } from './usersRepository';
export { default as itemsRepository } from './itemsRepository';
export { default as productsRepository } from './productsRepository';
export { default as ordersRepository } from './ordersRepository';
