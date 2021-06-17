import { Order, Item } from '.';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  orders: Order[];
  cart: Item[];
}
