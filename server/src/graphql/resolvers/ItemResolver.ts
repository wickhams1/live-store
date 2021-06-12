import { IResolvers } from 'graphql-tools';
import {
  MutationCreateItemArgs,
  QueryFindItemArgs,
  QueryGetItemsArgs,
  ItemResponse,
  ItemsListResponse,
} from '../generated';

import { ItemsService } from 'src/services';

export interface Dependencies {
  itemsService: ItemsService;
}

const ItemResolver = ({ itemsService: { createItem, findItem, getItems } }: Dependencies): IResolvers => ({
  Query: {
    async findItem(_: void, { id }: QueryFindItemArgs): Promise<ItemResponse> {
      const item = await findItem(id);
      return item ? { item: item } : {};
    },
    async getItems(_: void, { productId }: QueryGetItemsArgs): Promise<ItemsListResponse> {
      const items = await getItems(productId || undefined);
      return { items };
    },
  },

  Mutation: {
    async createItem(_: void, { item: itemInput }: MutationCreateItemArgs): Promise<ItemResponse> {
      const createdItem = await createItem(itemInput);
      return { item: createdItem };
    },
  },
});

export default ItemResolver;
