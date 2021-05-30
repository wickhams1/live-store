import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schemasMap';

const app = express();
const port = 3000;

const server = new ApolloServer({
  schema,
});

server.applyMiddleware({ app, path: '/graphql' });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
