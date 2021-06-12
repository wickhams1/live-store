import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '.';

@Entity()
export class Item {
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
