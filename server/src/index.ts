import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql';
import { usersService, booksService } from './services';
import { usersRepository, booksRepository } from './repositories/typeorm';

const app = express();
const port = 3000;

const server = new ApolloServer({
  schema: schema({
    ...usersService({ usersRepo: usersRepository }),
    ...booksService({ booksRepo: booksRepository, usersRepo: usersRepository }),
  }),
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
