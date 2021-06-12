import { User } from '.';

export interface Item {
  id: string;
  title: string;
  author: string;
  borrower?: User;
}
