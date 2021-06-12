import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql';
import { usersService, itemsService, productsService } from './services';
import { usersRepository, itemsRepository, productsRepository } from './repositories/typeorm';

const app = express();
const port = 3000;

const server = new ApolloServer({
  schema: schema({
    usersService: usersService({ usersRepo: usersRepository }),
    itemsService: itemsService({ itemsRepo: itemsRepository, productsRepo: productsRepository }),
    productsService: productsService({ productsRepo: productsRepository }),
  }),
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
