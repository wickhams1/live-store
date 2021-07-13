# Live Store

## Getting it started

### Dependencies

- Yarn
- Docker

### Steps

- Create a database.env file at the root of this repository. Check the file at `/server/src/repositories/typeorm/index.ts` to see if there are any values hardcoded there for the moment. Then set the following values:
  - POSTGRES_USER
  - POSTGRES_PASSWORD
  - POSTGRES_DB

- In the root of the repository:
  - run `yarn`
  - run `docker-compose up database`


- In the directory: `server`
  - run `yarn dev`
  - Go to localhost:4000/graphql for the GraphQL playground


- In the directory: `client`
  - run `yarn start`
  - Go to localhost:3000 if it doesn't pop up automatically
