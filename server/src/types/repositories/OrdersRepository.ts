import { Order } from '../entities';

type OrderInput = Omit<Order, 'id'>;

export interface OrdersRepository {
  createOrder: (order: OrderInput) => Promise<Order>;
  findOrder: (id: string) => Promise<Order | undefined>;
  getOrders: () => Promise<Order[]>;
  updateOrder: (order: Order) => Promise<Order>;
}
