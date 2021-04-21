import { getRepository } from 'typeorm';
import User from '../models/User';
import { BaseRespository } from './Base';

export class UserRepository extends BaseRespository {
  private repo = getRepository('User');

  async read(id: string): Promise<User> {
    const user = await this.repo.findOne(id) as unknown as User;
    return user;
  }

  async readByEmail(email: string): Promise<User[]> {
    const users = await this.repo.find({ email }) as unknown as User[];
    return users;
  }

  async insert(user: User): Promise<User> {
    await this.repo.save(user);
    return user;
  }

  async update(user: User): Promise<User> {
    const { id } = user;
    await this.repo.update({ id }, user);
    return user;
  }

  async delete(user: User): Promise<boolean> {
    const { id } = user;
    const userExists = !!(await this.repo.findOne({ id }));
    await this.repo.delete({ id });
    return userExists;
  }
}
