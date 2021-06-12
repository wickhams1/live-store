import { User } from 'src/types/entities';
import { UsersRepository } from 'src/types/repositories';

interface Dependencies {
  usersRepo: UsersRepository;
}

export type CreateUser = (user: Omit<User, 'id'>) => Promise<User>;

export const createUser =
  ({ usersRepo }: Dependencies): CreateUser =>
  (user) => {
    return usersRepo.createUser(user);
  };

export type FindUser = (id: string) => Promise<User | undefined>;

export const findUser =
  ({ usersRepo }: Dependencies): FindUser =>
  (id) => {
    return usersRepo.findUser(id);
  };

export type UsersService = {
  createUser: CreateUser;
  findUser: FindUser;
};

export const usersService = (dependencies: Dependencies): UsersService => ({
  createUser: createUser(dependencies),
  findUser: findUser(dependencies),
});
