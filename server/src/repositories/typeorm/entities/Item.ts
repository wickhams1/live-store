import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Product, Order, User } from '.';

@Entity()
export class Item {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @ManyToOne(() => Order)
  order?: Order;

  @ManyToOne(() => User)
  user?: User;
}
