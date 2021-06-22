import { IResolvers } from 'graphql-tools';
import {
  QueryFindOrderArgs,
  OrderResponse,
  OrdersListResponse,
  MutationCreateOrderArgs,
  MutationCreateOrderFromUserCartArgs,
} from '../generated';

import { OrdersService } from 'src/services';

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
    async createOrderFromUserCart(_: void, { userId }: MutationCreateOrderFromUserCartArgs): Promise<OrderResponse> {
      const order = await createOrderFromUserCart({ userId });
      return { order };
    },
  },
});

export default OrderResolver;
