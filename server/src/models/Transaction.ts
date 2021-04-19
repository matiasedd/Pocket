import BaseModel from './Base';

export default class Transaction extends BaseModel {
  id: string;

  userId: string;

  title: string;

  value: number;

  category: string;

  type: string;

  description: string;

  isFixed: string;
}
