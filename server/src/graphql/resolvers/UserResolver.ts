import { IResolvers } from 'graphql-tools';
import { Scalars, QueryGreetingArgs, MutationCreateUserArgs, QueryFindUserArgs, UserResponse } from '../generated';

import { UsersService } from 'src/services';

export interface Dependencies {
  usersService: UsersService;
}

const UserResolver = ({ usersService: { createUser, findUser } }: Dependencies): IResolvers => ({
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
