import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { schema } from './graphql';
import { usersService, itemsService, productsService, ordersService } from './services';
import { usersRepository, itemsRepository, productsRepository, ordersRepository } from './repositories/typeorm';

const app = express();
const port = 4000;

app.use(cors());

const server = new ApolloServer({
  schema: schema({
    usersService: usersService({ usersRepo: usersRepository, itemsRepo: itemsRepository }),
    itemsService: itemsService({ itemsRepo: itemsRepository, productsRepo: productsRepository }),
    productsService: productsService({ productsRepo: productsRepository }),
    ordersService: ordersService({
      ordersRepo: ordersRepository,
      itemsRepo: itemsRepository,
      usersRepo: usersRepository,
    }),
  }),
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
