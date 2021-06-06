import { UserViewModel } from '../../src/models/User';
import { UserPasswordViewModel } from '../../src/models/UserPassword';

export const usersMock: Array<UserViewModel> = [
  {
    id: 'd0f83766-f595-42ab-9c23-d489b8d3ff57',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    softDelete: false,
  },
  {
    id: '703172b0-5206-483c-ad5c-6c2a43e02dae',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@email.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    softDelete: false,
  },
];

export const usersPasswordMock: Array<UserPasswordViewModel> = [
  {
    userId: 'd0f83766-f595-42ab-9c23-d489b8d3ff57',
    id: '$2y$10$68jOhdg37v45TZY03cYC8eMkcs/bgmHQPUN34LbzSaM.fkgQouSDS',
    softDelete: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: '703172b0-5206-483c-ad5c-6c2a43e02dae',
    id: '$2y$10$knYSSwUIX..dgjwXOTnVAeHccgR3ctXW2KEgBH0bfIngzvGRy8yFu ',
    softDelete: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
