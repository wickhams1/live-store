import express, { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

class Person {
  firstName: string;
  lastName: string;

  constructor({ firstName, lastName }: Person) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  greeting() {
    return `Hello from ${this.firstName} ${this.lastName}`;
  }
}

const schema = buildSchema(`
  type Person {
    firstName: String!
    lastName: String!
    greeting: String!
  }

  type Query {
    hello: String
    person(firstName: String!, lastName: String!): Person
  }
`);

const root = {
  hello: () => {
    return 'Hello World!';
  },
  person: (person: Person) => {
    return new Person(person);
  },
};

const app = express();
const port = 3000;

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
