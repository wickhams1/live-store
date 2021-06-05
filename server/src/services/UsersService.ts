import { User } from 'src/types/entities';
import { UsersRepository } from 'src/types/repositories';

export type CreateUser = (user: Omit<User, 'id'>) => Promise<User>;

export const createUser =
  ({ usersRepo }: { usersRepo: UsersRepository }): CreateUser =>
  (user) => {
    return usersRepo.createUser(user);
  };

export type FindUser = (id: string) => Promise<User | undefined>;

export const findUser =
  ({ usersRepo }: { usersRepo: UsersRepository }): FindUser =>
  (id) => {
    return usersRepo.findUser(id);
  };

export type UsersService = {
  createUser: CreateUser;
  findUser: FindUser;
};

export const usersService = (dependencies: { usersRepo: UsersRepository }): UsersService => ({
  createUser: createUser(dependencies),
  findUser: findUser(dependencies),
});
