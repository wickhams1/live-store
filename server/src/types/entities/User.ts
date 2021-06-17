import { Order } from '.';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  orders: Order[];
}
