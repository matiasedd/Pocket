/* eslint-disable no-undef */
import { expect } from 'chai';
import { DeleteTransactionController } from '../../../src/controllers/transaction/DeleteTransaction';
import { HttpRequest } from '../../../src/protocols/HttpRequest';
import { TransactionRepositoryMock } from '../../mocks/TransactionRepository';
import { transactionsMock } from '../../mocks/TransactionData';
import { ControllerValidatorMock } from '../../../src/validators/Base';

describe('Class: DeleteTransaction', () => {
  let transactionRepository: TransactionRepositoryMock;
  let deleteTransactionsController: DeleteTransactionController;

  const httpRequestMock = {
    params: {
      transactionId: transactionsMock[0].id,
    },
  } as unknown as HttpRequest;

  beforeEach(() => {
    transactionRepository = new TransactionRepositoryMock(transactionsMock);
    deleteTransactionsController = new DeleteTransactionController(new ControllerValidatorMock(), transactionRepository);
  });

  context('Smoke Tests', () => {
    it('should have a handler method', () => {
      expect(deleteTransactionsController.handle).to.exist.which.be.a('function');
    });

    it('should have a transaction repository attribute', () => {
      expect(deleteTransactionsController._getPrivateAttr('transactionRepository')).to.exist;
    });
  });

  describe('Method: handle', async () => {
    const transactionToDelete = { ...transactionsMock[0] };
    const transactionsAmount = transactionsMock.length;
    const handle = await deleteTransactionsController.handle(httpRequestMock);

    it('should have deleted the transaction', () => {
      expect(transactionRepository.transactionsMock.length).to.be.equal(transactionsAmount - 1);
    });

    it('should return the deleted transaction on body', () => {
      expect(handle.body).to.exist;
      Object.keys(transactionToDelete).map((key) => {
        expect(handle.body[key]).to.be.equal(transactionsMock[0][key]);
        return null;
      });
    });

    it('should return statusCode 200', () => {
      expect(handle.statusCode).to.exist.which.equals(200);
    });
  });
});
