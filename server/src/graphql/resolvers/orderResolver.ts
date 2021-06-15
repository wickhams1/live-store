import { IResolvers } from 'graphql-tools';
import { QueryFindOrderArgs, OrderResponse, OrdersListResponse, MutationCreateOrderArgs } from '../generated';

import { OrdersService } from 'src/services';

export interface Dependencies {
  ordersService: OrdersService;
}

const OrderResolver = ({ ordersService: { createOrder, findOrder, getOrders } }: Dependencies): IResolvers => ({
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
    async createOrder(_: void, { itemIds }: MutationCreateOrderArgs): Promise<OrderResponse> {
      const order = await createOrder({ itemIds });
      return { order };
    },
  },
});

export default OrderResolver;
