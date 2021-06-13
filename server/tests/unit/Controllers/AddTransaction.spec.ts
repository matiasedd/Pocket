/* eslint-disable max-len */
/* eslint-disable no-undef */
import { expect } from 'chai';
import { AddTransactionController } from '../../../src/controllers/transaction/AddTransaction';
import { HttpRequest } from '../../../src/protocols/HttpRequest';
import { TransactionRepositoryMock } from '../../mocks/TransactionRepository';
import { usersMock } from '../../mocks/UserData';
import { transactionsMock } from '../../mocks/TransactionData';
import { HttpResponse } from '../../../src/protocols/HttpResponse';
import { ControllerValidatorMock } from '../../../src/validators/Base';

describe('Class: AddTransaction', () => {
  let transactionRepository: TransactionRepositoryMock;
  let addTransactionsController: AddTransactionController;

  const httpRequestMock = {
    body: {
      userId: usersMock[0].id,
      title: 'Panos de prato',
      value: 16.00,
      category: 'Coisas de casa',
      type: 'expense',
      description: '',
      isFixed: false,
    },
  } as unknown as HttpRequest;

  beforeEach(() => {
    transactionRepository = new TransactionRepositoryMock(transactionsMock);
    addTransactionsController = new AddTransactionController(new ControllerValidatorMock(), transactionRepository);
  });

  context('Smoke Tests', () => {
    it('should have a handler method', () => {
      expect(addTransactionsController.handle).to.exist.which.be.a('function');
    });

    it('should have a transaction repository attribute', () => {
      expect(addTransactionsController._getPrivateAttr('transactionRepository')).to.exist;
    });
  });

  describe('Method: handle', async () => {
    const transactionsAmount = transactionsMock.length;
    const handle = await addTransactionsController.handle(httpRequestMock);

    it('should have created the transaction', () => {
      expect(transactionRepository.transactionsMock.length).to.be.equal(transactionsAmount + 1);
    });

    it('should return the created transaction on body', () => {
      expect(handle.body).to.exist;
      Object.keys(transactionsMock[0]).map((key) => {
        expect(handle.body).to.have.property(key);
        return null;
      });
    });

    it('should return statusCode 200', () => {
      expect(handle.statusCode).to.exist.which.equals(200);
    });
  });
});
