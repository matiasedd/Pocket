/* eslint-disable no-undef */
import { expect } from 'chai';
import { HttpRequest } from '../../../../src/protocols/HttpRequest';
import { TransactionRepositoryMock } from '../../../mocks/TransactionRepository';
import { UserRepositoryMock } from '../../../mocks/UserRepository';
import { UpdateTransactionValidator } from '../../../../src/validators/transactions/UpdateTransaction';
import { TransactionRepository } from '../../../../src/repositories/Transaction';
import { transactionsMock } from '../../../mocks/TransactionData';
import { UserRepository } from '../../../../src/repositories/User';
import { usersMock, usersPasswordMock } from '../../../mocks/UserData';

describe('Validator: UpdateTransactionValidator', () => {
  let httpRequest: HttpRequest;
  let validator: UpdateTransactionValidator;
  let validate: HttpRequest;
  let transactionRepository: TransactionRepository;
  let userRepository: UserRepository;

  context('Transaction data is valid', () => {
    beforeEach(async () => {
      httpRequest = {
        body: transactionsMock[0],
        params: {
          transactionId: transactionsMock[0].id,
        },
        requesterId: transactionsMock[0].userId,
      } as unknown as HttpRequest;
      transactionRepository = new TransactionRepositoryMock(transactionsMock);
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      validator = new UpdateTransactionValidator(userRepository, transactionRepository);
      validate = await validator.validate(httpRequest) as HttpRequest;
    });

    it('should return an empty body and status 200', () => {
      expect(validate).to.be.eql({
        body: {},
        statusCode: 200,
      });
    });
  });

  context('Transaction or user data is not valid', () => {
    beforeEach(async () => {
      transactionRepository = new TransactionRepositoryMock(transactionsMock);
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      validator = new UpdateTransactionValidator(userRepository, transactionRepository);
    });

    it("should return status 404 and a body with message 'Usuário não encontrado' when the transaction owner does not exist", async () => {
      httpRequest = {
        body: {
          userId: 'xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx',
        },
        params: {
          transactionId: transactionsMock[0].id,
        },
        requesterId: usersMock[0].id,
      } as unknown as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate).to.eql({
        body: 'Usuário não encontrado',
        statusCode: 404,
      });
    });

    it("should return status 401 and a body with message 'Usuário não é dono do recurso' when requester id is different from transaction owner id", async () => {
      httpRequest = {
        body: {
          userId: usersMock[1].id,
        },
        params: {
          transactionId: transactionsMock[0].id,
        },
        requesterId: usersMock[0].id,
      } as unknown as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate).to.eql({
        body: 'Usuário não é dono do recurso',
        statusCode: 401,
      });
    });

    it("should return status 404 and a body with message 'Transação não encontrada' when the transaction does not exist", async () => {
      httpRequest = {
        body: {
          userId: usersMock[0].id,
        },
        params: {
          transactionId: 'xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx',
        },
        requesterId: usersMock[0].id,
      } as unknown as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate).to.eql({
        body: 'Transação não encontrada',
        statusCode: 404,
      });
    });

    it("should return status 403 and a body with message 'Usuário não é dono do recurso' when user is not the transaction owner", async () => {
      httpRequest = {
        body: transactionsMock[3],
        params: {
          transactionId: transactionsMock[0].id,
        },
        requesterId: usersMock[0].id,
      } as unknown as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate).to.eql({
        body: 'Usuário não é dono do recurso',
        statusCode: 401,
      });
    });
  });
});
