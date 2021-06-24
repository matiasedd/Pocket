import { Optional } from 'sequelize';
import { BaseModel, BaseViewModel } from './Base';

export interface UserPasswordViewModel extends BaseViewModel {
  userId: string

  id: string
}

export interface UserPasswordInputModel extends Optional<UserPasswordViewModel, 'createdAt' | 'updatedAt'> { }

export class UserPasswordModel extends BaseModel<UserPasswordViewModel, UserPasswordInputModel> {
  userId: string

  id: string
}

export const inputAttrs = [
  'userId',
  'id',
];
