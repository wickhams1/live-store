import { Book } from 'src/types/entities';
import { BooksRepository, UsersRepository } from 'src/types/repositories';

export type CreateBook = (book: Omit<Book, 'id'>) => Promise<Book>;

interface Dependencies {
  booksRepo: BooksRepository;
  usersRepo: UsersRepository;
}

export const createBook =
  ({ booksRepo }: Dependencies): CreateBook =>
  (book) => {
    return booksRepo.createBook(book);
  };

export type FindBook = (id: string) => Promise<Book | undefined>;

export const findBook =
  ({ booksRepo }: Dependencies): FindBook =>
  (id) => {
    return booksRepo.findBook(id);
  };

export type GetBooks = () => Promise<Book[]>;

export const getBooks =
  ({ booksRepo }: Dependencies): GetBooks =>
  () => {
    return booksRepo.getBooks();
  };

export type SetBorrower = (bookId: string, userId: string) => Promise<Book | undefined>;

export const setBorrower =
  ({ booksRepo, usersRepo }: Dependencies): SetBorrower =>
  async (bookId: string, userId: string) => {
    const book = await booksRepo.findBook(bookId);
    const user = await usersRepo.findUser(userId);

    if (!book || !user || book.borrower) return;

    book.borrower = user;

    return booksRepo.updateBook(book);
  };

export type BooksService = {
  createBook: CreateBook;
  findBook: FindBook;
  getBooks: GetBooks;
  setBorrower: SetBorrower;
};

export const booksService = (dependencies: Dependencies): BooksService => ({
  createBook: createBook(dependencies),
  findBook: findBook(dependencies),
  getBooks: getBooks(dependencies),
  setBorrower: setBorrower(dependencies),
});
