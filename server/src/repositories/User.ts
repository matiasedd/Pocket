import { UserViewModel, UserInputModel } from '../models/User';
import { User } from '../database/entities';
import { BaseRespository } from './Base';
import { UserPassword } from '../database/entities/UserPassword';
import { UserPasswordInputModel, UserPasswordModel, UserPasswordViewModel } from '../models/UserPassword';

export class UserRepository extends BaseRespository {
  async read(id: string): Promise<UserViewModel> {
    const user = await User.findByPk(id);
    return user;
  }

  async readAll(): Promise<UserViewModel[]> {
    const users = await User.findAll({});
    return users;
  }

  async readByEmail(email: string): Promise<UserViewModel> {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async insert(user: UserInputModel): Promise<UserViewModel> {
    const createdUser = User.create(user);
    return createdUser;
  }

  async update(updatedUser: UserViewModel): Promise<UserViewModel> {
    const { id } = updatedUser;
    const user = await User.findByPk(id);
    Object.keys(user).map((key) => {
      user[key] = updatedUser[key];
      return null;
    });
    await user.save();
    return user;
  }

  async delete(user: UserInputModel): Promise<boolean> {
    const { id } = user;
    const userExists = await User.findByPk(id);
    await userExists.destroy();
    return !!userExists;
  }

  async deleteById(id: string): Promise<boolean> {
    const userExists = await User.findByPk(id);
    await userExists.destroy();
    return !!userExists;
  }

  async insertPassword(password: UserPasswordInputModel): Promise<UserPasswordModel> {
    const createdPassword = await UserPassword.create(password);
    return createdPassword;
  }

  async getPassword(userId: string): Promise<UserPasswordViewModel> {
    const userPassword = await UserPassword.findOne({ where: { userId } });
    return userPassword;
  }
}
