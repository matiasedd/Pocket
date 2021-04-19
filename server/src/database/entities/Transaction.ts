import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
import BaseEntity from './BaseEntity';
import User from './User';

@Entity()
export default class Transaction extends BaseEntity {
  @ManyToOne(() => User)
  user: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'value' })
  value: number;

  @Column({ name: 'category' })
  category: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'is_fixed' })
  isFixed: boolean;
}
