/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';
import { UserViewModel, UserInputModel, UserModel } from '../../src/models/User';
import {
  UserPasswordInputModel, UserPasswordViewModel, inputAttrs, UserPasswordModel,
} from '../../src/models/UserPassword';
import { UserRepository } from '../../src/repositories/User';

/**
 * Esta classe é um mock da UserRepository, que oferece todas as funcionalidades da mesma,
 * sem a necessidade da conexão com o banco de dados. Seu propósito é ser utilizada pelos
 * testes unitários.
 */

export class UserRepositoryMock extends UserRepository {
  private usersMock: Array<UserViewModel>;

  private usersPasswordMock: Array<UserPasswordViewModel>;

  constructor(usersMock: Array<UserViewModel>, usersPasswordMock: Array<UserPasswordViewModel>) {
    super();
    this.usersMock = [...usersMock];
    this.usersPasswordMock = [...usersPasswordMock];
  }

  async read(id: string): Promise<UserViewModel> {
    const userFound = this.usersMock.filter((user) => user.id === id);
    return Promise.resolve(userFound.length > 0 ? { ...userFound[0] } : null);
  }

  async readAll(): Promise<Array<UserViewModel>> {
    return Promise.resolve(this.usersMock);
  }

  async readByEmail(email: string): Promise<UserViewModel> {
    const userFound = this.usersMock.filter((user) => user.email === email);
    return Promise.resolve(userFound.length > 0 ? { ...userFound[0] } : null);
  }

  async insert(user: UserInputModel): Promise<UserViewModel> {
    // Declaração dos atributos do parâmetro user
    const userInput: UserInputModel = {
      email: '',
      firstName: '',
      lastName: '',
      softDelete: false,
    };
    // Verifica se user possui todos os atributos necessários
    let hasAllAttrs = true;
    Object.keys(userInput).map((key) => {
      if (user[key] === undefined) {
        hasAllAttrs = false;
      }
      return null;
    });
    // Usuário criado = user + atributos da model (id, createdAt, updatedAt)
    const createdUser: UserModel = {
      ...user,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as UserModel;
    if (hasAllAttrs) {
      this.usersMock.push(createdUser);
    }
    // Só retorna o usuário criado se user tinha todos os atriutos neecssários
    return Promise.resolve(hasAllAttrs ? createdUser : null);
  }

  async update(updatedUser: UserViewModel): Promise<UserViewModel> {
    const { id } = updatedUser;
    const userFound = this.usersMock.filter((user) => user.id === id)[0];
    if (userFound) {
      Object.keys(userFound).map((key) => {
        userFound[key] = updatedUser[key];
        return null;
      });
    }
    return Promise.resolve(userFound || null);
  }

  async delete(user: UserInputModel): Promise<boolean> {
    let deleted = false;
    let indexToRemove = -1;
    for (let i = 0; i < this.usersMock.length; i++) {
      if (this.usersMock[i].id === user.id) {
        deleted = true;
        indexToRemove = i;
        break;
      }
    }
    if (deleted) {
      this.usersMock.splice(indexToRemove, 1);
    }
    return Promise.resolve(deleted);
  }

  async deleteById(id: string): Promise<boolean> {
    let deleted = false;
    let indexToRemove = -1;
    for (let i = 0; i < this.usersMock.length; i++) {
      if (this.usersMock[i].id === id) {
        deleted = true;
        indexToRemove = i;
        break;
      }
    }
    if (deleted) {
      this.usersMock.splice(indexToRemove, 1);
    }
    return Promise.resolve(deleted);
  }

  async insertPassword(password: UserPasswordInputModel): Promise<UserPasswordModel> {
    const passwordAttrs = inputAttrs;
    let hasAllAttrs = true;
    passwordAttrs.forEach((key) => {
      if (password[key] === undefined) {
        hasAllAttrs = false;
      }
    });
    return Promise.resolve(hasAllAttrs ? password as UserPasswordModel : null);
  }

  async getPassword(userId: string): Promise<UserPasswordViewModel> {
    const passwordExists = this.usersPasswordMock.filter((passwordMock) => passwordMock.userId === userId);
    return Promise.resolve(passwordExists[0] || null);
  }
}
