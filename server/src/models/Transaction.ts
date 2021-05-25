import { Optional } from 'sequelize';
import { BaseModel, BaseViewModel } from './Base';

export interface TransactionViewModel extends BaseViewModel {
  userId: string

  title: string

  value: number

  category: string

  type: string

  description: string

  isFixed: boolean
}

export interface TransactionInputModel extends Optional<TransactionViewModel, 'createdAt'|'updatedAt'> {}

export class TransactionModel extends BaseModel<TransactionViewModel, TransactionInputModel> {
  userId: string

  title: string

  value: number

  category: string

  type: string

  description: string

  isFixed: boolean
}
