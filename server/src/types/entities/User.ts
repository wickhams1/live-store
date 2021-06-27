import { Order, Item } from '.';

export interface User {
  id: string;
  name: string;
  emailAddress: string;
  orders: Order[];
  cart: Item[];
}
