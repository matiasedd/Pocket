/* eslint-disable max-len */
/* eslint-disable no-undef */
import { expect } from 'chai';
import { GetTransactionController } from '../../../src/controllers/transaction/GetTransaction';
import { HttpRequest } from '../../../src/protocols/HttpRequest';
import { TransactionRepositoryMock } from '../../mocks/TransactionRepository';
import { UserRepositoryMock } from '../../mocks/UserRepository';
import { usersMock, usersPasswordMock } from '../../mocks/UserData';
import { transactionsMock } from '../../mocks/TransactionData';
import { UserRepository } from '../../../src/repositories/User';
import { TransactionRepository } from '../../../src/repositories/Transaction';
import { HttpResponse } from '../../../src/protocols/HttpResponse';
import { ControllerValidatorMock } from '../../../src/validators/Base';

describe('Class: GetTransaction', () => {
  let transactionRepository: TransactionRepository;
  let getTransactionsController: GetTransactionController;
  const httpRequestMock = {
    body: {},
    params: {
      transactionId: transactionsMock[0].id,
    },
  } as unknown as HttpRequest;

  context('Smoke Tests', () => {
    beforeEach(() => {
      transactionRepository = new TransactionRepositoryMock(transactionsMock);
      getTransactionsController = new GetTransactionController(new ControllerValidatorMock(), transactionRepository);
    });

    it('should have a handler method', () => {
      expect(getTransactionsController.handle).to.exist.which.be.a('function');
    });

    it('should have a transaction repository attribute', () => {
      expect(getTransactionsController._getPrivateAttr('transactionRepository')).to.exist;
    });
  });

  describe('Method: handle', () => {
    let handle: HttpResponse;
    before(async () => {
      transactionRepository = new TransactionRepositoryMock(transactionsMock);
      getTransactionsController = new GetTransactionController(new ControllerValidatorMock(), transactionRepository);
      handle = await getTransactionsController.handle(httpRequestMock);
    });

    it('should return status 200 and the transaction on body', () => {
      expect(handle).to.be.eql({
        statusCode: 200,
        body: transactionsMock[0],
      });
    });
  });
});
