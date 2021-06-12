import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
