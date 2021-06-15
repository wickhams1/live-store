import { Order } from 'src/types/entities';
import { ItemsRepository, OrdersRepository } from 'src/types/repositories';

interface Dependencies {
  ordersRepo: OrdersRepository;
  itemsRepo: ItemsRepository;
}
class NoItemsError extends Error {
  constructor() {
    super('Orders require min 1 item');
  }
}

class ItemsNotFoundError extends Error {
  constructor(itemIds: string[]) {
    super('Some items in the request were not found: ' + itemIds);
  }
}

export type CreateOrder = ({ itemIds }: { itemIds: string[] }) => Promise<Order>;

export const createOrder =
  ({ ordersRepo, itemsRepo }: Dependencies): CreateOrder =>
  async ({ itemIds }) => {
    if (!itemIds.length) throw new NoItemsError();

    const items = await itemsRepo.getSpecificItems(itemIds);

    if (items.length < itemIds.length) {
      const foundItemIds = items.map((item) => item.id);
      const notFoundItemIds = itemIds.filter((id) => !foundItemIds.includes(id));

      throw new ItemsNotFoundError(notFoundItemIds);
    }

    return ordersRepo.createOrder({ items });
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
