import { Book } from 'src/types/entities';
import { BooksRepository } from 'src/types/repositories';
import { getConnection, getRepository } from 'typeorm';
import { v4 } from 'uuid';
import { Book as BookEntity } from './entities';

const booksRepository: BooksRepository = {
  createBook: async ({ author, title }: Book) => {
    const book = new BookEntity();
    book.id = v4();
    book.author = author;
    book.title = title;

    await getConnection().manager.save(book).then();

    return book;
  },
  findBook: (id: string) => {
    return getConnection().manager.findOne(BookEntity, id);
  },
  getBooks: () => {
    return getRepository(BookEntity).find();
  },
  updateBook: (book: Book) => {
    return getConnection().manager.save(book);
  },
};

export default booksRepository;
