import { IResolvers } from 'graphql-tools';
import {
  MutationCreateItemArgs,
  QueryFindItemArgs,
  ItemResponse,
  ItemsListResponse,
  MutationBorrowItemArgs,
} from '../generated';

import { CreateItem, FindItem, GetItems, SetBorrower } from 'src/services/ItemsService';

export interface Dependencies {
  createItem: CreateItem;
  findItem: FindItem;
  getItems: GetItems;
  setBorrower: SetBorrower;
}

const ItemResolver = ({ createItem, findItem, getItems, setBorrower }: Dependencies): IResolvers => ({
  Query: {
    async findItem(_: void, { id }: QueryFindItemArgs): Promise<ItemResponse> {
      const item = await findItem(id);
      return item ? { item: item } : {};
    },
    async getItems(): Promise<ItemsListResponse> {
      const items = await getItems();
      return { items };
    },
  },

  Mutation: {
    async createItem(_: void, { item }: MutationCreateItemArgs): Promise<ItemResponse> {
      const createdItem = await createItem(item);
      return { item: createdItem };
    },
    async borrowItem(_: void, { userId, itemId }: MutationBorrowItemArgs): Promise<ItemResponse> {
      const item = await setBorrower(itemId, userId);
      return { item };
    },
  },
});

export default ItemResolver;
