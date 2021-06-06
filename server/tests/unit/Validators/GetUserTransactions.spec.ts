/* eslint-disable no-undef */
import { expect } from 'chai';
import { UserViewModel } from '../../../src/models/User';
import { HttpRequest } from '../../../src/protocols/HttpRequest';
import { UserRepository } from '../../../src/repositories/User';
import { GetUserTransactionsValidator } from '../../../src/validators/transactions/GetUserTransactions';

describe('Validator: GetUserTransactionsValidator', () => {
  // We only need 1 user for ours tests
  const usersMock: [UserViewModel] = [
    {
      id: 'd0f83766-f595-42ab-9c23-d489b8d3ff57',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      softDelete: false,
    },
  ];

  // UserRepository needs only the read method for our tests
  const userRepositoryMock = {
    async read(userId: string) {
      const foundUser = usersMock.filter((user) => user.id === userId);
      return Promise.resolve(foundUser.length > 0 ? foundUser[0] : null);
    },
  } as unknown as UserRepository;

  context('User exists', () => {
    let httpRequest: HttpRequest;
    let validator: GetUserTransactionsValidator;
    let validate: HttpRequest;

    beforeEach(async () => {
      httpRequest = {
        body: {},
        params: {
          userId: 'd0f83766-f595-42ab-9c23-d489b8d3ff57',
        },
        requesterId: 'd0f83766-f595-42ab-9c23-d489b8d3ff57',
      } as unknown as HttpRequest;
      validator = new GetUserTransactionsValidator(userRepositoryMock);
      validate = await validator.validate(httpRequest) as HttpRequest;
    });

    it('should return an empty body', () => {
      expect(validate.body).to.be.eql({});
    });

    it('should return statusCode 200', () => {
      expect(validate.statusCode).to.be.equals(200);
    });
  });

  context('User does not exist', () => {
    let httpRequest: HttpRequest;
    let validator: GetUserTransactionsValidator;
    let validate: HttpRequest;

    beforeEach(async () => {
      httpRequest = {
        body: {},
        params: {
          userId: 'xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx',
        },
      } as unknown as HttpRequest;
      validator = new GetUserTransactionsValidator(userRepositoryMock);
      validate = await validator.validate(httpRequest) as HttpRequest;
    });

    it("should have a body with message 'Usuário desconhecido'", async () => {
      expect(validate.body).to.equals('Usuário desconhecido');
    });

    it('should have a statusCode 401 (Unauthorized)', async () => {
      expect(validate.statusCode).to.equals(401);
    });
  });

  context('User does not own the resource (requester id from token is different from id on route param)', () => {
    let httpRequest: HttpRequest;
    let validator: GetUserTransactionsValidator;
    let validate: HttpRequest;

    beforeEach(async () => {
      httpRequest = {
        body: {},
        params: {
          userId: 'd0f83766-f595-42ab-9c23-d489b8d3ff57',
        },
        requesterId: 'xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx',
      } as unknown as HttpRequest;
      validator = new GetUserTransactionsValidator(userRepositoryMock);
      validate = await validator.validate(httpRequest) as HttpRequest;
    });

    it("should have a body with message 'Usuário não é dono do recurso'", async () => {
      expect(validate.body).to.equals('Usuário não é dono do recurso');
    });

    it('should have a statusCode 403 (Forbidden)', async () => {
      expect(validate.statusCode).to.equals(403);
    });
  });
});
