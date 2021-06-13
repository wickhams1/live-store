import { Order } from 'src/types/entities';
import { OrdersRepository } from 'src/types/repositories';
import { getConnection, getRepository } from 'typeorm';
import { v4 } from 'uuid';
import { Order as OrderEntity } from './entities';

const ordersRepository: OrdersRepository = {
  createOrder: async (orderInput: Order) => {
    const order = new OrderEntity();
    order.id = v4();
    order.items = [];

    await getConnection().manager.save(order);

    return order;
  },
  findOrder: (id: string) => {
    return getConnection().manager.findOne(OrderEntity, id);
  },
  getOrders: async () => {
    return getRepository(OrderEntity).find();
  },
  updateOrder: (order: Order) => {
    return getConnection().manager.save(order);
  },
};

export default ordersRepository;
