import { IResolvers } from 'graphql-tools';
import { Scalars, QueryGreetingArgs, MutationCreateUserArgs, User } from '../generated';
import { v4 } from 'uuid';

const UserResolver: IResolvers = {
  Query: {
    async greeting(_: void, { user: { firstName, lastName } }: QueryGreetingArgs): Promise<Scalars['String']> {
      return `Hello ${firstName} ${lastName}!`;
    },
  },

  Mutation: {
    async createUser(_: void, { user: { firstName, lastName } }: MutationCreateUserArgs): Promise<User> {
      return {
        firstName,
        lastName,
        id: v4(),
      };
    },
  },
};

export default UserResolver;
