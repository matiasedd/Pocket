/* eslint-disable max-len */
/* eslint-disable no-undef */
import { expect } from 'chai';
import { TransactionRepository } from '../../../src/repositories/Transaction';
import { GetUserTransactionsController } from '../../../src/controllers/transaction/GetUserTransactions';
import { GetUserTransactionsValidator } from '../../../src/validators/transactions/GetUserTransactions';
import { HttpRequest } from '../../../src/protocols/HttpRequest';
import { TransactionViewModel } from '../../../src/models/Transaction';
import { UserRepository } from '../../../src/repositories/User';

describe('Class: GetUserTransactions', () => {
  let getUserTransactionsController;
  let handle;

  const httpRequestMock = {
    body: {},
    params: {
      userId: 'd0f83766-f595-42ab-9c23-d489b8d3ff57',
    },
  } as unknown as HttpRequest;

  const transactionMock: TransactionViewModel = {
    id: 'b575d7a0-4394-47ab-a495-875196ee36f4',
    createdAt: new Date(),
    updatedAt: new Date(),
    softDelete: false,
    userId: 'd0f83766-f595-42ab-9c23-d489b8d3ff57',
    title: 'Compra no mercado',
    value: 148.65,
    category: 'Mercado',
    type: 'expense',
    description: 'Acabou a mistura e o shampoo',
    isFixed: false,
  };

  const transactionRepositoryMock = {
    async readByUser(userId: string) {
      const transactionData = [
        { ...transactionMock },
      ];
      return Promise.resolve(transactionData.filter((transaction) => transaction.userId === userId));
    },
  };

  beforeEach(() => {
    const transactionRepository = transactionRepositoryMock as unknown as TransactionRepository;
    getUserTransactionsController = new GetUserTransactionsController(new GetUserTransactionsValidator(new UserRepository()), transactionRepository);
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
      expect(handle).to.have.property('body').which.be.a('array').and.lengthOf(1);
      handle.body.forEach((transaction: TransactionViewModel) => {
        Object.keys(transactionMock).map((key) => expect(transaction).to.have.property(key));
      });
    });

    it('should return status code 200', () => {
      expect(handle).to.have.property('statusCode').which.equals(200);
    });
  });
});
