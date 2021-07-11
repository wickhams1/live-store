import { IResolvers } from 'graphql-tools';
import {
  MutationCreateUserArgs,
  QueryFindUserArgs,
  UserResponse,
  MutationAddProductsToCartArgs,
  QueryFindUserByEmailAddressArgs,
  QueryGetUserCartArgs,
  QueryGetUserOrdersArgs,
  ItemsListResponse,
  OrdersListResponse,
} from '../generated';
import { UsersService } from 'src/services';
import pubsub from '../pubsub';
import streamIds from './streamIds';

export interface Dependencies {
  usersService: UsersService;
}

const UserResolver = ({
  usersService: { createUser, findUser, addProductsToCart, findUserByEmailAddress },
}: Dependencies): IResolvers => ({
  Query: {
    async findUser(_: void, { id }: QueryFindUserArgs): Promise<UserResponse> {
      const user = await findUser(id);
      return user ? { user } : {};
    },
    async findUserByEmailAddress(_: void, { emailAddress }: QueryFindUserByEmailAddressArgs): Promise<UserResponse> {
      const user = await findUserByEmailAddress(emailAddress);
      return user ? { user } : {};
    },
    async getUserCart(_: void, { userId }: QueryGetUserCartArgs): Promise<ItemsListResponse> {
      return { items: (await findUser(userId))?.cart };
    },
    async getUserOrders(_: void, { userId }: QueryGetUserOrdersArgs): Promise<OrdersListResponse> {
      return { orders: (await findUser(userId))?.orders };
    },
  },

  Mutation: {
    async createUser(_: void, { user }: MutationCreateUserArgs): Promise<UserResponse> {
      const createdUser = await createUser(user);
      return { user: createdUser };
    },
    async addProductsToCart(_: void, { userId, products }: MutationAddProductsToCartArgs): Promise<UserResponse> {
      const user = await addProductsToCart({ userId, products });

      products.forEach((requestedProduct) =>
        pubsub.publish(streamIds.PRODUCT_UPDATED, {
          productUpdated: user.cart.find((cartProduct) => cartProduct.product.id === requestedProduct.productId)
            ?.product,
        })
      );

      pubsub.publish(streamIds.USER_UPDATED, { userUpdated: user });

      return { user };
    },
  },

  Subscription: {
    userUpdated: {
      subscribe: () => pubsub.asyncIterator([streamIds.USER_UPDATED]),
    },
  },
});

export default UserResolver;
