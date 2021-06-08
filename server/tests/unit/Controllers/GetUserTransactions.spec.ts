/* eslint-disable max-len */
/* eslint-disable no-undef */
import { expect } from 'chai';
import { GetUserTransactionsController } from '../../../src/controllers/transaction/GetUserTransactions';
import { HttpRequest } from '../../../src/protocols/HttpRequest';
import { TransactionViewModel } from '../../../src/models/Transaction';
import { transactionsMock } from '../../mocks/TransactionData';
import { TransactionRepositoryMock } from '../../mocks/TransactionRepository';
import { usersMock } from '../../mocks/UserData';
import { ControllerValidatorMock } from '../../../src/validators/Base';

describe('Class: GetUserTransactions', () => {
  let getUserTransactionsController;
  let handle;

  const httpRequestMock = {
    body: {},
    params: {
      userId: usersMock[0].id,
    },
  } as unknown as HttpRequest;

  beforeEach(() => {
    const transactionRepository = new TransactionRepositoryMock(transactionsMock);
    getUserTransactionsController = new GetUserTransactionsController(new ControllerValidatorMock(), transactionRepository);
  });

  context('Smoke Tests', () => {
    it('should have a handler method', () => {
      expect(getUserTransactionsController.handle).to.exist.which.be.a('function');
    });

    it('should have a transaction repository attribute', () => {
      expect(getUserTransactionsController.transactionRepository).to.exist;
    });
  });

  describe('Method: handle', () => {
    beforeEach(async () => {
      handle = await getUserTransactionsController.handle(httpRequestMock);
    });

    it('should return an array of transactions on body', async () => {
      expect(handle).to.have.property('body').which.be.a('array').and.lengthOf(3);
      handle.body.forEach((transaction: TransactionViewModel) => {
        Object.keys(transactionsMock[0]).map((key) => expect(transaction).to.have.property(key));
      });
    });

    it('should return status code 200', () => {
      expect(handle).to.have.property('statusCode').which.equals(200);
    });
  });
});
