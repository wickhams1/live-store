import { Book } from '../entities';

type BookInput = Omit<Book, 'id'>;

export interface BooksRepository {
  createBook: (book: BookInput) => Promise<Book>;
  findBook: (id: string) => Promise<Book | undefined>;
  getBooks: () => Promise<Book[]>;
}
