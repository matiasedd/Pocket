/* eslint-disable no-undef */
import { expect } from 'chai';
import { HttpRequest } from '../../../src/protocols/HttpRequest';
import { UserRepository } from '../../../src/repositories/User';
import { GetUserTransactionsValidator } from '../../../src/validators/transactions/GetUserTransactions';
import { usersMock, usersPasswordMock } from '../../mocks/UserData';
import { UserRepositoryMock } from '../../mocks/UserRepository';

describe('Validator: GetUserTransactionsValidator', () => {
  let httpRequest: HttpRequest;
  let userRepository: UserRepository;
  let validator: GetUserTransactionsValidator;
  let validate: HttpRequest;

  context('User exists', () => {
    beforeEach(async () => {
      httpRequest = {
        body: {},
        params: {
          userId: usersMock[0].id,
        },
        requesterId: usersMock[0].id,
      } as unknown as HttpRequest;
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      validator = new GetUserTransactionsValidator(userRepository);
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
    beforeEach(async () => {
      httpRequest = {
        body: {},
        params: {
          userId: 'xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx',
        },
        requesterId: usersMock[0].id,
      } as unknown as HttpRequest;
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      validator = new GetUserTransactionsValidator(userRepository);
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
    beforeEach(async () => {
      httpRequest = {
        body: {},
        params: {
          userId: usersMock[0].id,
        },
        requesterId: usersMock[1].id,
      } as unknown as HttpRequest;
      validator = new GetUserTransactionsValidator(userRepository);
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
