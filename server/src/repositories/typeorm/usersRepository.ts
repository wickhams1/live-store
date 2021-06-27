import { User } from 'src/types/entities';
import { UsersRepository } from 'src/types/repositories';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';
import { User as UserEntity } from './entities';

const usersRepository: UsersRepository = {
  createUser: async ({ name, emailAddress, orders, cart }: User) => {
    const user = new UserEntity();
    user.id = v4();
    user.name = name;
    user.emailAddress = emailAddress;
    user.orders = orders;
    user.cart = cart;

    await getConnection().manager.save(user).then();

    return user;
  },
  findUser: (id: string) => {
    return getConnection().manager.findOne(UserEntity, id);
  },
  findUserByEmailAddress: (emailAddress: string) => {
    return getConnection().manager.findOne(UserEntity, {
      where: {
        emailAddress,
      },
    });
  },
  updateUser: (user: User) => {
    return getConnection().manager.save(user);
  },
};

export default usersRepository;
