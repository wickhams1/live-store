import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Item } from '.';

@Entity()
export class Order {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => Item, (item) => item.order, { eager: true })
  items: Item[];
}
