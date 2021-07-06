import { Entity, Column, PrimaryColumn, AfterLoad, getConnection } from 'typeorm';
import { Item } from '.';

@Entity()
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  availableQuantity: number = 0;

  @AfterLoad()
  public async calculateAvailableQuantity?() {
    this.availableQuantity = await getConnection().manager.count(Item, {
      where: {
        product: {
          id: this.id,
        },
        user: null,
        order: null,
      },
    });
  }
}
