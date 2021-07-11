import { Item, Product } from 'src/types/entities';
import { ItemsRepository, ProductsRepository } from 'src/types/repositories';

export type CreateItem = (item: Omit<Item, 'id' | 'product'> & { productId: string }) => Promise<Item>;

interface Dependencies {
  itemsRepo: ItemsRepository;
  productsRepo: ProductsRepository;
}

class ProductNotFoundError extends Error {
  constructor() {
    super('Product not found');
  }
}

export const createItem =
  ({ itemsRepo, productsRepo }: Dependencies): CreateItem =>
  async (itemInput) => {
    const { productId } = itemInput;

    const product = await productsRepo.findProduct(productId);

    if (!product) {
      throw new ProductNotFoundError();
    }

    const item = await itemsRepo.createItem({ product });

    item.product = (await productsRepo.findProduct(productId)) as Product;

    return item;
  };

export type FindItem = (id: string) => Promise<Item | undefined>;

export const findItem =
  ({ itemsRepo }: Dependencies): FindItem =>
  (id) => {
    return itemsRepo.findItem(id);
  };

export type GetItems = (productId?: string) => Promise<Item[]>;

export const getItems =
  ({ itemsRepo }: Dependencies): GetItems =>
  (productId) => {
    return productId ? itemsRepo.getAvailableItemsForProductId(productId) : itemsRepo.getItems();
  };

export type ItemsService = {
  createItem: CreateItem;
  findItem: FindItem;
  getItems: GetItems;
};

export const itemsService = (dependencies: Dependencies): ItemsService => ({
  createItem: createItem(dependencies),
  findItem: findItem(dependencies),
  getItems: getItems(dependencies),
});
