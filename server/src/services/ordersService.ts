import { Item, Order } from 'src/types/entities';
import { ItemsRepository, OrdersRepository, UsersRepository } from 'src/types/repositories';
import { errors } from '.';
interface Dependencies {
  ordersRepo: OrdersRepository;
  itemsRepo: ItemsRepository;
  usersRepo: UsersRepository;
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

    if (!user) throw new errors.UserNotFoundError();

    if (!products.length) throw new errors.NoProductsError();

    const itemsResults = await Promise.all(
      products.map(({ productId, quantity }) => itemsRepo.getAvailableItemsForProductId(productId, quantity))
    );

    // Merge all items into a single array
    const items = itemsResults.reduce((acc: Item[], curr: Item[]) => acc.concat(curr), []);
    const requestedNumItems = products.reduce((acc: number, { quantity }) => acc + quantity, 0);

    if (items.length < requestedNumItems) {
      // TODO: return the products not found in the error message
      throw new errors.ProductsNotFoundError();
    }

    return ordersRepo.createOrder({ items, userId });
  };

export type CreateOrderFromUserCart = ({ userId }: { userId: string }) => Promise<Order>;

export const createOrderFromUserCart =
  ({ ordersRepo, usersRepo }: Dependencies): CreateOrderFromUserCart =>
  async ({ userId }) => {
    const user = await usersRepo.findUser(userId);

    if (!user) throw new errors.UserNotFoundError();

    const items = user.cart;

    if (!items.length) throw new errors.NoProductsError();

    const order = await ordersRepo.createOrder({ items, userId });

    user.cart = [];
    user.orders.push(order);

    await usersRepo.updateUser(user);

    return order;
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
  createOrderFromUserCart: CreateOrderFromUserCart;
};

export const ordersService = (dependencies: Dependencies): OrdersService => ({
  createOrder: createOrder(dependencies),
  findOrder: findOrder(dependencies),
  getOrders: getOrders(dependencies),
  createOrderFromUserCart: createOrderFromUserCart(dependencies),
});
