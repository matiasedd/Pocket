import * as Sequelize from 'sequelize';

export interface BaseViewModel {
  id: string

  createdAt: Date

  updatedAt: Date

  softDelete: boolean
}

export class BaseModel<T, U> extends Sequelize.Model<T, U> {
  id: string

  createdAt: Date

  updatedAt: Date

  softDelete: boolean
}
