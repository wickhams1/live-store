import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Order, Item } from '.';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  emailAddress: string;

  @OneToMany(() => Order, ({ user }) => user, { eager: true })
  orders: Order[];

  @OneToMany(() => Item, ({ user }) => user, { eager: true })
  cart: Item[];
}
