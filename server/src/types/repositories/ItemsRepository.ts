import { Item } from '../entities';

type ItemInput = Omit<Item, 'id'>;

export interface ItemsRepository {
  createItem: (item: ItemInput) => Promise<Item>;
  findItem: (id: string) => Promise<Item | undefined>;
  getItems: (productId?: string) => Promise<Item[]>;
  updateItem: (item: Item) => Promise<Item>;
}
