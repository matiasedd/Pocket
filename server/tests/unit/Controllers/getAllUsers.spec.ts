/* eslint-disable no-undef */
import { expect } from 'chai';
import { UserViewModel } from '../../../src/models/User';
import { GetAllUsersController } from '../../../src/controllers/user/GetAllUsers';
import { UserRepository } from '../../../src/repositories/User';
import { HttpRequest } from '../../../src/protocols/HttpRequest';

describe('Class: GetAllUsersController', () => {
  let getAllUsersController = null;

  const httpRequestMock = {
    body: {},
  } as HttpRequest;

  const userMock: UserViewModel = {
    id: 'd0f83766-f595-42ab-9c23-d489b8d3ff57',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    softDelete: false,
  };

  const userRepositoryMock = {
    async readAll() {
      return Promise.resolve([userMock]);
    },
  };

  beforeEach(() => {
    const userRepository = { ...userRepositoryMock } as UserRepository;
    getAllUsersController = new GetAllUsersController(userRepository);
  });

  context('Smoke Tests', () => {
    it('should have a handler method', () => {
      expect(getAllUsersController).to.have.property('handle').which.be.a('function');
    });
  });

  describe('Method: handle', () => {
    it('should return an array of users on body and statusCode 200', async () => {
      const handle = await getAllUsersController.handle(httpRequestMock);
      expect(handle).to.have.property('body').which.be.a('array');
      handle.body.forEach((user: UserViewModel) => {
        Object.keys(userMock).map((key) => expect(user).to.have.property(key));
      });
      expect(handle).to.have.property('statusCode').which.equals(200);
    });
  });
});
