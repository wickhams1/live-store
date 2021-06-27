import { IResolvers } from 'graphql-tools';
import { MutationCreateUserArgs, QueryFindUserArgs, UserResponse, MutationAddProductsToCartArgs } from '../generated';

import { UsersService } from 'src/services';

export interface Dependencies {
  usersService: UsersService;
}

const UserResolver = ({ usersService: { createUser, findUser, addProductsToCart } }: Dependencies): IResolvers => ({
  Query: {
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
    async addProductsToCart(_: void, { userId, products }: MutationAddProductsToCartArgs): Promise<UserResponse> {
      const user = await addProductsToCart({ userId, products });
      return { user };
    },
  },
});

export default UserResolver;
