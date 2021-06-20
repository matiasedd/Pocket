/* eslint-disable max-len */
/* eslint-disable no-undef */
import { expect } from 'chai';
import { GetUserTransactionsController } from '../../../../src/controllers/transaction/GetUserTransactions';
import { HttpRequest } from '../../../../src/protocols/HttpRequest';
import { transactionsMock } from '../../../mocks/TransactionData';
import { TransactionRepositoryMock } from '../../../mocks/TransactionRepository';
import { usersMock } from '../../../mocks/UserData';
import { ControllerValidatorMock } from '../../../../src/validators/Base';

describe('Controller: GetUserTransactions', () => {
  let transactionRepository;
  let getUserTransactionsController;
  let handle;

  const httpRequestMock = {
    body: {},
    params: {
      userId: usersMock[0].id,
    },
  } as unknown as HttpRequest;

  context('Smoke Tests', () => {
    beforeEach(() => {
      transactionRepository = new TransactionRepositoryMock(transactionsMock);
      getUserTransactionsController = new GetUserTransactionsController(new ControllerValidatorMock(), transactionRepository);
    });

    it('should have a handler method', () => {
      expect(getUserTransactionsController.handle).to.exist.which.be.a('function');
    });

    it('should have a transaction repository attribute', () => {
      expect(getUserTransactionsController.transactionRepository).to.exist;
    });
  });

  describe('Method: handle', () => {
    before(async () => {
      transactionRepository = new TransactionRepositoryMock(transactionsMock);
      getUserTransactionsController = new GetUserTransactionsController(new ControllerValidatorMock(), transactionRepository);
      handle = await getUserTransactionsController.handle(httpRequestMock);
    });

    it('should return status 200 and an array of transactions on body', async () => {
      expect(handle.statusCode).to.be.equal(200);
      handle.body.forEach((transaction) => {
        expect(transaction.userId).to.be.equal(httpRequestMock.params.userId);
      });
    });
  });
});
