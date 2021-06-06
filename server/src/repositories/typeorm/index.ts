import { createConnection } from 'typeorm';

createConnection({
  type: 'sqlite',
  database: __dirname + '/testDB.sqlite',
  entities: [__dirname + '/entities/*.ts'],
  synchronize: true,
  logging: true,
});

export { default as usersRepository } from './usersRepository';
