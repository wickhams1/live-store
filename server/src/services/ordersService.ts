import { Item, Order } from 'src/types/entities';
import { ItemsRepository, OrdersRepository, UsersRepository } from 'src/types/repositories';

interface Dependencies {
  ordersRepo: OrdersRepository;
  itemsRepo: ItemsRepository;
  usersRepo: UsersRepository;
}
class NoProductsError extends Error {
  constructor() {
    super('Orders require min 1 product');
  }
}

class ProductsNotFoundError extends Error {
  constructor(itemIds: string[]) {
    super('Some products in the request were not found: ' + itemIds);
  }
}

class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}

export type CreateOrder = ({ userId, productIds }: { userId: string; productIds: string[] }) => Promise<Order>;

export const createOrder =
  ({ ordersRepo, itemsRepo, usersRepo }: Dependencies): CreateOrder =>
  async ({ userId, productIds }) => {
    const user = await usersRepo.findUser(userId);

    if (!user) throw new UserNotFoundError();

    if (!productIds.length) throw new NoProductsError();

    const itemsResults = await Promise.all(productIds.map((id) => itemsRepo.getAvailableItemsForProductId(id, 1)));

    // Merge all items into a single array
    const items = itemsResults.reduce((acc: Item[], curr: Item[]) => acc.concat(curr), []);

    if (items.length < productIds.length) {
      const foundProductIds = items.map((item: Item) => item.product.id);
      const notFoundProductIds = productIds.filter((id) => !foundProductIds.includes(id));

      throw new ProductsNotFoundError(notFoundProductIds);
    }

    return ordersRepo.createOrder({ items, userId });
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
