/* eslint-disable no-undef */
import { expect } from 'chai';
import { UpdateTransactionController } from '../../../src/controllers/transaction/UpdateTransaction';
import { HttpRequest } from '../../../src/protocols/HttpRequest';
import { TransactionRepositoryMock } from '../../mocks/TransactionRepository';
import { transactionsMock } from '../../mocks/TransactionData';
import { ControllerValidatorMock } from '../../../src/validators/Base';

describe('Class: UpdateTransaction', () => {
  let transactionRepository: TransactionRepositoryMock;
  let updateTransactionsController: UpdateTransactionController;

  const httpRequestMock = {
    body: {
      id: 'b575d7a0-4394-47ab-a495-875196ee36f4',
      userId: 'd0f83766-f595-42ab-9c23-d489b8d3ff57',
      title: 'Compra na mercearia',
      value: 95.65,
      category: 'Suprimentos',
      type: 'expense',
      description: 'Acabou as verduras',
      isFixed: false,
    },
  } as unknown as HttpRequest;

  beforeEach(() => {
    transactionRepository = new TransactionRepositoryMock(transactionsMock);
    updateTransactionsController = new UpdateTransactionController(new ControllerValidatorMock(), transactionRepository);
  });

  context('Smoke Tests', () => {
    it('should have a handler method', () => {
      expect(updateTransactionsController.handle).to.exist.which.be.a('function');
    });

    it('should have a transaction repository attribute', () => {
      expect(updateTransactionsController._getPrivateAttr('transactionRepository')).to.exist;
    });
  });

  describe('Method: handle', async () => {
    const handle = await updateTransactionsController.handle(httpRequestMock);

    it('should have updated the transaction', () => {
      expect(transactionRepository.transactionsMock[0]).to.be.equal(6);
      Object.keys(httpRequestMock.body).map((key) => {
        expect(transactionRepository.transactionsMock[0][key]).to.exist.which.be.equal(httpRequestMock.body[key]);
        return null;
      });
    });

    it('should return the updated transaction on body', () => {
      expect(handle.body).to.exist;
      Object.keys(transactionsMock[0]).map((key) => {
        expect(handle.body[key]).to.be.equal(transactionsMock[0][key]);
        return null;
      });
    });

    it('should return statusCode 200', () => {
      expect(handle.statusCode).to.exist.which.equals(200);
    });
  });
});
