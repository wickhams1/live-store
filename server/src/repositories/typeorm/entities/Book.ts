import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryColumn()
  id: string;

  @Column()
  author: string;

  @Column()
  title: string;
}
