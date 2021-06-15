import { Item } from '../entities';

type ItemInput = Omit<Item, 'id'>;

export interface ItemsRepository {
  createItem: (item: ItemInput) => Promise<Item>;
  findItem: (id: string) => Promise<Item | undefined>;
  getItems: () => Promise<Item[]>;
  getItemsForProductId: (productId: string) => Promise<Item[]>;
  getSpecificItems: (itemIds: string[]) => Promise<Item[]>;
  updateItem: (item: Item) => Promise<Item>;
}
