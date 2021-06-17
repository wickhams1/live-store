import { User, Item } from 'src/types/entities';
import { ItemsRepository, UsersRepository } from 'src/types/repositories';
import { errors } from '.';

interface Dependencies {
  usersRepo: UsersRepository;
  itemsRepo: ItemsRepository;
}

export type CreateUser = (user: Omit<User, 'id' | 'orders' | 'cart'>) => Promise<User>;

export const createUser =
  ({ usersRepo }: Dependencies): CreateUser =>
  (user) => {
    return usersRepo.createUser({ orders: [], cart: [], ...user });
  };

export type FindUser = (id: string) => Promise<User | undefined>;

export const findUser =
  ({ usersRepo }: Dependencies): FindUser =>
  (id) => {
    return usersRepo.findUser(id);
  };

export type AddProductsToCart = ({
  userId,
  products,
}: {
  userId: string;
  products: { productId: string; quantity: number }[];
}) => Promise<User>;

export const addProductsToCart =
  ({ itemsRepo, usersRepo }: Dependencies): AddProductsToCart =>
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

    user.cart = user.cart ? user.cart.concat(items) : items;

    return usersRepo.updateUser(user);
  };

export type UsersService = {
  createUser: CreateUser;
  findUser: FindUser;
  addProductsToCart: AddProductsToCart;
};

export const usersService = (dependencies: Dependencies): UsersService => ({
  createUser: createUser(dependencies),
  findUser: findUser(dependencies),
  addProductsToCart: addProductsToCart(dependencies),
});
