import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseEntity from './BaseEntity';

@Entity()
export default class User extends BaseEntity {
  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'password' })
  password: number;
}
