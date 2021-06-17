import { User } from '../entities';

type UserInput = Omit<User, 'id'>;

export interface UsersRepository {
  createUser: (user: UserInput) => Promise<User>;
  findUser: (id: string) => Promise<User | undefined>;
  updateUser: (user: User) => Promise<User>;
}
