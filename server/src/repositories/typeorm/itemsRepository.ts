import { Item } from 'src/types/entities';
import { ItemsRepository } from 'src/types/repositories';
import { getConnection, getRepository } from 'typeorm';
import { v4 } from 'uuid';
import { Item as ItemEntity } from './entities';

const itemsRepository: ItemsRepository = {
  createItem: async ({ author, title }: Item) => {
    const item = new ItemEntity();
    item.id = v4();
    item.author = author;
    item.title = title;

    await getConnection().manager.save(item).then();

    return item;
  },
  findItem: (id: string) => {
    return getConnection().manager.findOne(ItemEntity, id);
  },
  getItems: () => {
    return getRepository(ItemEntity).find();
  },
  updateItem: (item: Item) => {
    return getConnection().manager.save(item);
  },
};

export default itemsRepository;
