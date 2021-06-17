import { User } from 'src/types/entities';
import { UsersRepository } from 'src/types/repositories';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';
import { User as UserEntity } from './entities';

const usersRepository: UsersRepository = {
  createUser: async ({ firstName, lastName, orders, cart }: User) => {
    const user = new UserEntity();
    user.id = v4();
    user.firstName = firstName;
    user.lastName = lastName;
    user.orders = orders;
    user.cart = cart;

    await getConnection().manager.save(user).then();

    return user;
  },
  findUser: (id: string) => {
    return getConnection().manager.findOne(UserEntity, id);
  },
};

export default usersRepository;
