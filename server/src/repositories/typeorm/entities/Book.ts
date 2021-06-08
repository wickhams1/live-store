import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '.';

@Entity()
export class Book {
  @PrimaryColumn()
  id: string;

  @Column()
  author: string;

  @Column()
  title: string;

  @OneToOne(() => User, { eager: true, cascade: true })
  @JoinColumn()
  borrower: User;
}
