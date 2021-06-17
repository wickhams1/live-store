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
  constructor() {
    super('Some products in the request were not found');
  }
}

class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}

export type CreateOrder = ({
  userId,
  products,
}: {
  userId: string;
  products: { productId: string; quantity: number }[];
}) => Promise<Order>;

export const createOrder =
  ({ ordersRepo, itemsRepo, usersRepo }: Dependencies): CreateOrder =>
  async ({ userId, products }) => {
    const user = await usersRepo.findUser(userId);

    if (!user) throw new UserNotFoundError();

    if (!products.length) throw new NoProductsError();

    const itemsResults = await Promise.all(
      products.map(({ productId, quantity }) => itemsRepo.getAvailableItemsForProductId(productId, quantity))
    );

    // Merge all items into a single array
    const items = itemsResults.reduce((acc: Item[], curr: Item[]) => acc.concat(curr), []);
    const requestedNumItems = products.reduce((acc: number, { quantity }) => acc + quantity, 0);

    if (items.length < requestedNumItems) {
      // TODO: return the products not found in the error message
      throw new ProductsNotFoundError();
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
