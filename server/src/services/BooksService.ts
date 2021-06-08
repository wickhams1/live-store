import { Book } from 'src/types/entities';
import { BooksRepository } from 'src/types/repositories';

export type CreateBook = (book: Omit<Book, 'id'>) => Promise<Book>;

export const createBook =
  ({ booksRepo }: { booksRepo: BooksRepository }): CreateBook =>
  (book) => {
    return booksRepo.createBook(book);
  };

export type FindBook = (id: string) => Promise<Book | undefined>;

export const findBook =
  ({ booksRepo }: { booksRepo: BooksRepository }): FindBook =>
  (id) => {
    return booksRepo.findBook(id);
  };

export type GetBooks = () => Promise<Book[]>;

export const getBooks =
  ({ booksRepo }: { booksRepo: BooksRepository }): GetBooks =>
  () => {
    return booksRepo.getBooks();
  };

export type BooksService = {
  createBook: CreateBook;
  findBook: FindBook;
  getBooks: GetBooks;
};

export const booksService = (dependencies: { booksRepo: BooksRepository }): BooksService => ({
  createBook: createBook(dependencies),
  findBook: findBook(dependencies),
  getBooks: getBooks(dependencies),
});
