import { UsersRepository } from 'src/types/repositories';
import { User } from 'src/types/entities';

import { v4 } from 'uuid';

const users: User[] = [];

const repository: UsersRepository = {
  createUser: (user) => {
    const storedUser = {
      ...user,
      id: v4(),
    };
    users.push(storedUser);

    return Promise.resolve(storedUser);
  },

  findUser: (id) => {
    return Promise.resolve(users.find((user: User) => user.id === id));
  },
};

export default repository;
