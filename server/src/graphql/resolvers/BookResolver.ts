import { IResolvers } from 'graphql-tools';
import {
  MutationCreateBookArgs,
  QueryFindBookArgs,
  BookResponse,
  BooksListResponse,
  MutationBorrowBookArgs,
} from '../generated';

import { CreateBook, FindBook, GetBooks, SetBorrower } from 'src/services/BooksService';

export interface Dependencies {
  createBook: CreateBook;
  findBook: FindBook;
  getBooks: GetBooks;
  setBorrower: SetBorrower;
}

const BookResolver = ({ createBook, findBook, getBooks, setBorrower }: Dependencies): IResolvers => ({
  Query: {
    async findBook(_: void, { id }: QueryFindBookArgs): Promise<BookResponse> {
      const book = await findBook(id);
      return book ? { book: book } : {};
    },
    async getBooks(): Promise<BooksListResponse> {
      const books = await getBooks();
      return { books };
    },
  },

  Mutation: {
    async createBook(_: void, { book }: MutationCreateBookArgs): Promise<BookResponse> {
      const createdBook = await createBook(book);
      return { book: createdBook };
    },
    async borrowBook(_: void, { userId, bookId }: MutationBorrowBookArgs): Promise<BookResponse> {
      const book = await setBorrower(bookId, userId);
      return { book };
    },
  },
});

export default BookResolver;
