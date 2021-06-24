/* eslint-disable no-undef */
import { expect } from 'chai';
import { HttpRequest } from '../../../../src/protocols/HttpRequest';
import { UserRepositoryMock } from '../../../mocks/UserRepository';
import { DeleteTransactionValidator } from '../../../../src/validators/transactions/DeleteTransaction';
import { UserRepository } from '../../../../src/repositories/User';
import { usersMock, usersPasswordMock } from '../../../mocks/UserData';
import { transactionsMock } from '../../../mocks/TransactionData';
import { TransactionRepositoryMock } from '../../../mocks/TransactionRepository';
import { TransactionRepository } from '../../../../src/repositories/Transaction';

describe('Validator: DeleteTransactionValidator', () => {
  let httpRequest: HttpRequest;
  let validator: DeleteTransactionValidator;
  let validate: HttpRequest;
  let userRepository: UserRepository;
  let transactionRepository: TransactionRepository;

  beforeEach(async () => {
    userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
    transactionRepository = new TransactionRepositoryMock(transactionsMock);
    validator = new DeleteTransactionValidator(userRepository, transactionRepository);
  });

  context('Operation is valid', () => {
    it('should return an empty body and status 200', async () => {
      httpRequest = {
        params: {
          transactionId: transactionsMock[0].id,
        },
        requesterId: usersMock[0].id,
      } as unknown as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate).to.be.eql({
        body: {},
        statusCode: 200,
      });
    });
  });

  context('Operation is not valid', () => {
    it("should return status 404 and a body with message 'Transação não encontrada' when the transaction does not exist", async () => {
      httpRequest = {
        params: {
          transactionId: 'xxxxxxxx-xxxxx-xxxxx-xxxxxxxxx',
        },
        requesterId: usersMock[0].id,
      } as unknown as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate).to.be.eql({
        body: 'Transação não encontrada',
        statusCode: 404,
      });
    });

    it("should return status 403 and a body with message 'Usuário não é dono do recurso' when the user tries to delete a transaction he does not own", async () => {
      httpRequest = {
        params: {
          transactionId: transactionsMock[0].id,
        },
        requesterId: usersMock[1].id,
      } as unknown as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate).to.be.eql({
        body: 'Usuário não é dono do recurso',
        statusCode: 403,
      });
    });
  });
});
