import { Entity, PrimaryColumn, OneToMany, ManyToOne, Column } from 'typeorm';
import { Item, User } from '.';

@Entity()
export class Order {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => Item, (item) => item.order, { eager: true })
  items: Item[];

  @ManyToOne(() => User)
  user?: User;

  @Column()
  userId: string;
}
