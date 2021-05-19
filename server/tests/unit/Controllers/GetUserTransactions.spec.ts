/* eslint-disable max-len */
/* eslint-disable no-undef */
import { expect } from 'chai';
import { TransactionRepository } from '../../../src/repositories/Transaction';
import { GetUserTransactionsController } from '../../../src/controllers/transaction/GetUserTransactions';
import { getUserTransactionsValidator } from '../../../src/validators/transactions/getUserTransactions';
import { HttpRequest } from '../../../src/protocols/HttpRequest';
import { TransactionViewModel } from '../../../src/models/Transaction';

describe('Class: GetUserTransactions', () => {
  let getUserTransactionsController = null;

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
    async readByUser() {
      return Promise.resolve([transactionMock]);
    },
  };

  beforeEach(() => {
    const transactionRepository = { ...transactionRepositoryMock } as unknown as TransactionRepository;
    getUserTransactionsController = new GetUserTransactionsController(getUserTransactionsValidator, transactionRepository);
  });

  context('Smoke Tests', () => {
    it('should have a handler method', () => {
      expect(getUserTransactionsController).to.have.property('handle').which.be.a('function');
    });

    it('should have a validate method', () => {
      expect(getUserTransactionsController).to.have.property('validate').which.be.a('function');
    });
  });

  describe('Method: handle', () => {
    it('should return an array of transactions on body and status 200', async () => {
      const handle = await getUserTransactionsController.handle(httpRequestMock);
      expect(handle).to.have.property('body').which.be.a('array');
      handle.body.forEach((transaction: TransactionViewModel) => {
        Object.keys(transactionMock).map((key) => expect(transaction).to.have.property(key));
      });
      expect(handle).to.have.property('statusCode').which.equals(200);
    });
  });
});
