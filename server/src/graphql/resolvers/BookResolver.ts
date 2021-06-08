import { IResolvers } from 'graphql-tools';
import { MutationCreateBookArgs, QueryFindBookArgs, BookResponse } from '../generated';

import { CreateBook, FindBook } from 'src/services/BooksService';

export interface Dependencies {
  createBook: CreateBook;
  findBook: FindBook;
}

const BookResolver = ({ createBook, findBook }: Dependencies): IResolvers => ({
  Query: {
    async findBook(_: void, { id }: QueryFindBookArgs): Promise<BookResponse> {
      const book = await findBook(id);
      return book ? { book: book } : {};
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
