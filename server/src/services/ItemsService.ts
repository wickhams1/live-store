import { Item } from 'src/types/entities';
import { ItemsRepository, UsersRepository } from 'src/types/repositories';

export type CreateItem = (item: Omit<Item, 'id'>) => Promise<Item>;

interface Dependencies {
  itemsRepo: ItemsRepository;
  usersRepo: UsersRepository;
}

export const createItem =
  ({ itemsRepo }: Dependencies): CreateItem =>
  (item) => {
    return itemsRepo.createItem(item);
  };

export type FindItem = (id: string) => Promise<Item | undefined>;

export const findItem =
  ({ itemsRepo }: Dependencies): FindItem =>
  (id) => {
    return itemsRepo.findItem(id);
  };

export type GetItems = () => Promise<Item[]>;

export const getItems =
  ({ itemsRepo }: Dependencies): GetItems =>
  () => {
    return itemsRepo.getItems();
  };

export type SetBorrower = (itemId: string, userId: string) => Promise<Item | undefined>;

export const setBorrower =
  ({ itemsRepo, usersRepo }: Dependencies): SetBorrower =>
  async (itemId: string, userId: string) => {
    const item = await itemsRepo.findItem(itemId);
    const user = await usersRepo.findUser(userId);

    if (!item || !user || item.borrower) return;

    item.borrower = user;

    return itemsRepo.updateItem(item);
  };

export type ItemsService = {
  createItem: CreateItem;
  findItem: FindItem;
  getItems: GetItems;
  setBorrower: SetBorrower;
};

export const itemsService = (dependencies: Dependencies): ItemsService => ({
  createItem: createItem(dependencies),
  findItem: findItem(dependencies),
  getItems: getItems(dependencies),
  setBorrower: setBorrower(dependencies),
});
