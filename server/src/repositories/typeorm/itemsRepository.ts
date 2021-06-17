import { Item } from 'src/types/entities';
import { ItemsRepository } from 'src/types/repositories';
import { getConnection, getRepository, In } from 'typeorm';
import { v4 } from 'uuid';
import { Item as ItemEntity } from './entities';

const itemsRepository: ItemsRepository = {
  createItem: async ({ product }: Item) => {
    const item = new ItemEntity();
    item.id = v4();
    item.product = product;

    await getConnection().manager.save(item);

    return item;
  },
  findItem: (id: string) => {
    return getConnection().manager.findOne(ItemEntity, id);
  },
  getItems: () => {
    return getRepository(ItemEntity).find();
  },
  getAvailableItemsForProductId: (productId: string, max?: number) => {
    return getRepository(ItemEntity).find({
      where: { product: { id: productId }, order: null, user: null },
      take: max,
    });
  },
  getSpecificItems: async (itemIds: string[]) => {
    return getRepository(ItemEntity).find({ where: { id: In(itemIds) } });
  },
  updateItem: (item: Item) => {
    return getConnection().manager.save(item);
  },
};

export default itemsRepository;
