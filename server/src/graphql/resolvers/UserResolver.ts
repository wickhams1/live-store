import { IResolvers } from 'graphql-tools';
import { Scalars, QueryGreetingArgs, MutationCreateUserArgs, QueryFindUserArgs, UserResponse } from '../generated';

import { CreateUser, FindUser } from 'src/services/usersService';

export interface Dependencies {
  createUser: CreateUser;
  findUser: FindUser;
}

const UserResolver = ({ createUser, findUser }: Dependencies): IResolvers => ({
  Query: {
    async greeting(_: void, { user: { firstName, lastName } }: QueryGreetingArgs): Promise<Scalars['String']> {
      return `Hello ${firstName} ${lastName}!`;
    },
    async findUser(_: void, { id }: QueryFindUserArgs): Promise<UserResponse> {
      const user = await findUser(id);
      return user ? { user } : {};
    },
  },

  Mutation: {
    async createUser(_: void, { user }: MutationCreateUserArgs): Promise<UserResponse> {
      const createdUser = await createUser(user);
      return { user: createdUser };
    },
  },
});

export default UserResolver;
