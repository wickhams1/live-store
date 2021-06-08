import { User } from '.';

export interface Book {
  id: string;
  title: string;
  author: string;
  borrower?: User;
}
