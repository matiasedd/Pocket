import BaseModel from './Base';

export default class User extends BaseModel {
  id: string

  email: string

  firstName: string

  lastName: string

  password: number
}
