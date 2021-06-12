import { Item } from 'src/types/entities';
import { ItemsRepository } from 'src/types/repositories';
import { getConnection, getRepository } from 'typeorm';
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
  getItems: async (productId?: string) => {
    const filter = productId ? { where: { product: { id: productId } } } : undefined;

    return getRepository(ItemEntity).find(filter);
  },
  updateItem: (item: Item) => {
    return getConnection().manager.save(item);
  },
};

export default itemsRepository;
