import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql';
import { usersService } from './services';
import { UsersRepository } from './repositories/memory';

const app = express();
const port = 3000;

const server = new ApolloServer({
  schema: schema(usersService({ usersRepo: UsersRepository })),
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
