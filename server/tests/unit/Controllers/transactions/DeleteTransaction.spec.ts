/* eslint-disable no-undef */
import { expect } from 'chai';
import { DeleteTransactionController } from '../../../../src/controllers/transaction/DeleteTransaction';
import { HttpRequest } from '../../../../src/protocols/HttpRequest';
import { TransactionRepositoryMock } from '../../../mocks/TransactionRepository';
import { transactionsMock } from '../../../mocks/TransactionData';
import { ControllerValidatorMock } from '../../../../src/validators/Base';

describe('Controller: DeleteTransaction', () => {
  let transactionRepository: TransactionRepositoryMock;
  let deleteTransactionsController: DeleteTransactionController;

  const httpRequestMock = {
    params: {
      transactionId: transactionsMock[0].id,
    },
  } as unknown as HttpRequest;

  context('Smoke Tests', () => {
    beforeEach(() => {
      transactionRepository = new TransactionRepositoryMock(transactionsMock);
      deleteTransactionsController = new DeleteTransactionController(new ControllerValidatorMock(), transactionRepository);
    });

    it('should have a handler method', () => {
      expect(deleteTransactionsController.handle).to.exist.which.be.a('function');
    });

    it('should have a transaction repository attribute', () => {
      expect(deleteTransactionsController._getPrivateAttr('transactionRepository')).to.exist;
    });
  });

  describe('Method: handle', async () => {
    let transactionsAmount;
    let handle;

    before(async () => {
      transactionRepository = new TransactionRepositoryMock(transactionsMock);
      deleteTransactionsController = new DeleteTransactionController(new ControllerValidatorMock(), transactionRepository);
      transactionsAmount = transactionsMock.length;
      handle = await deleteTransactionsController.handle(httpRequestMock);
    });

    it('should have deleted the transaction', () => {
      expect(transactionRepository.transactionsMock.length).to.be.equal(transactionsAmount - 1);
    });

    it('should return status 200 and a body with deleted true', () => {
      expect(handle).to.be.eql({
        statusCode: 200,
        body: {
          deleted: true,
        },
      });
    });
  });
});
