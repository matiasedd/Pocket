/* eslint-disable max-len */
/* eslint-disable no-undef */
import { expect } from 'chai';
import { AddTransactionController } from '../../../../src/controllers/transaction/AddTransaction';
import { HttpRequest } from '../../../../src/protocols/HttpRequest';
import { TransactionRepositoryMock } from '../../../mocks/TransactionRepository';
import { usersMock } from '../../../mocks/UserData';
import { transactionsMock } from '../../../mocks/TransactionData';
import { ControllerValidatorMock } from '../../../../src/validators/Base';

describe('Controller: AddTransaction', () => {
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

  context('Smoke Tests', () => {
    beforeEach(() => {
      transactionRepository = new TransactionRepositoryMock(transactionsMock);
      addTransactionsController = new AddTransactionController(new ControllerValidatorMock(), transactionRepository);
    });

    it('should have a handler method', () => {
      expect(addTransactionsController.handle).to.exist.which.be.a('function');
    });

    it('should have a transaction repository attribute', () => {
      expect(addTransactionsController._getPrivateAttr('transactionRepository')).to.exist;
    });
  });

  context('Method: handle', async () => {
    let transactionsAmount: number;
    let handle;

    before(async () => {
      transactionRepository = new TransactionRepositoryMock(transactionsMock);
      addTransactionsController = new AddTransactionController(new ControllerValidatorMock(), transactionRepository);
      transactionsAmount = transactionsMock.length;
      handle = await addTransactionsController.handle(httpRequestMock);
    });

    it('should have created the transaction', () => {
      expect(transactionRepository.transactionsMock.length).to.be.equal(transactionsAmount + 1);
    });

    it('should return status 200 and the created transaction on body', () => {
      expect(handle.statusCode).to.be.equal(200);
      Object.keys(httpRequestMock.body).map((key) => {
        expect(handle.body[key]).to.be.equal(httpRequestMock.body[key]);
        return null;
      });
    });
  });
});
