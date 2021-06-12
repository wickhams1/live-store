import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Product } from '.';

@Entity()
export class Item {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Product, { eager: true })
  product: Product;
}
