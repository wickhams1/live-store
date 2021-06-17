import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Order } from '.';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Order, ({ user }) => user, { eager: true })
  orders: Order[];
}
