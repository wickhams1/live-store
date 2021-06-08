import { IResolvers } from 'graphql-tools';
import { MutationCreateBookArgs, QueryFindBookArgs, BookResponse, BooksListResponse } from '../generated';

import { CreateBook, FindBook, GetBooks } from 'src/services/BooksService';

export interface Dependencies {
  createBook: CreateBook;
  findBook: FindBook;
  getBooks: GetBooks;
}

const BookResolver = ({ createBook, findBook, getBooks }: Dependencies): IResolvers => ({
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
  },
});

export default BookResolver;
