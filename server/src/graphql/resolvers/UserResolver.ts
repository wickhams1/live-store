import { IResolvers } from 'graphql-tools';
import { Scalars, QueryGreetingArgs, MutationCreateUserArgs, User } from '../generated';

import { CreateUser } from 'src/services/UsersService';

export interface Dependencies {
  createUser: CreateUser;
}

const UserResolver = ({ createUser }: Dependencies): IResolvers => ({
  Query: {
    async greeting(_: void, { user: { firstName, lastName } }: QueryGreetingArgs): Promise<Scalars['String']> {
      return `Hello ${firstName} ${lastName}!`;
    },
  },

  Mutation: {
    async createUser(_: void, { user }: MutationCreateUserArgs): Promise<User> {
      return createUser(user);
    },
  },
});

export default UserResolver;
