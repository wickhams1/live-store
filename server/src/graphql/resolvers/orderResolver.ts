import { IResolvers } from 'graphql-tools';
import {
  QueryFindOrderArgs,
  OrderResponse,
  OrdersListResponse,
  MutationCreateOrderArgs,
  MutationCreateOrderFromUserCartArgs,
  UserResponse,
} from '../generated';

import { OrdersService } from 'src/services';
import pubsub from '../pubsub';
import streamIds from './streamIds';

export interface Dependencies {
  ordersService: OrdersService;
}

const OrderResolver = ({
  ordersService: { createOrder, findOrder, getOrders, createOrderFromUserCart },
}: Dependencies): IResolvers => ({
  Query: {
    async findOrder(_: void, { id }: QueryFindOrderArgs): Promise<OrderResponse> {
      const order = await findOrder(id);
      return order ? { order } : {};
    },
    async getOrders(): Promise<OrdersListResponse> {
      const orders = await getOrders();
      return { orders };
    },
  },

  Mutation: {
    async createOrder(_: void, { userId, products }: MutationCreateOrderArgs): Promise<OrderResponse> {
      const order = await createOrder({ userId, products });
      return { order };
    },
    async createOrderFromUserCart(_: void, { userId }: MutationCreateOrderFromUserCartArgs): Promise<UserResponse> {
      const user = await createOrderFromUserCart({ userId });

      pubsub.publish(streamIds.USER_UPDATED, { userUpdated: user });

      return { user };
    },
  },
});

export default OrderResolver;
