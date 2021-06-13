import { Order } from 'src/types/entities';
import { OrdersRepository } from 'src/types/repositories';

interface Dependencies {
  ordersRepo: OrdersRepository;
}

export type CreateOrder = (order: Omit<Order, 'id'>) => Promise<Order>;

export const createOrder =
  ({ ordersRepo }: Dependencies): CreateOrder =>
  async (orderInput) => {
    return ordersRepo.createOrder(orderInput);
  };

export type FindOrder = (id: string) => Promise<Order | undefined>;

export const findOrder =
  ({ ordersRepo }: Dependencies): FindOrder =>
  (id) => {
    return ordersRepo.findOrder(id);
  };

export type GetOrders = () => Promise<Order[]>;

export const getOrders =
  ({ ordersRepo }: Dependencies): GetOrders =>
  () => {
    return ordersRepo.getOrders();
  };

export type OrdersService = {
  createOrder: CreateOrder;
  findOrder: FindOrder;
  getOrders: GetOrders;
};

export const ordersService = (dependencies: Dependencies): OrdersService => ({
  createOrder: createOrder(dependencies),
  findOrder: findOrder(dependencies),
  getOrders: getOrders(dependencies),
});
