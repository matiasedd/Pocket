/* eslint-disable no-undef */
import { expect } from 'chai';
import { UpdateTransactionController } from '../../../../src/controllers/transaction/UpdateTransaction';
import { HttpRequest } from '../../../../src/protocols/HttpRequest';
import { TransactionRepositoryMock } from '../../../mocks/TransactionRepository';
import { transactionsMock } from '../../../mocks/TransactionData';
import { ControllerValidatorMock } from '../../../../src/validators/Base';

describe('Controller: UpdateTransaction', () => {
  let transactionRepository: TransactionRepositoryMock;
  let updateTransactionsController: UpdateTransactionController;

  const httpRequestMock = {
    body: {
      id: transactionsMock[0].id,
      userId: transactionsMock[0].userId,
      title: 'Compra na mercearia',
      value: 95.65,
      category: 'Suprimentos',
      type: 'expense',
      description: 'Acabou as verduras',
      isFixed: false,
    },
  } as unknown as HttpRequest;

  context('Smoke Tests', () => {
    beforeEach(() => {
      transactionRepository = new TransactionRepositoryMock(transactionsMock);
      updateTransactionsController = new UpdateTransactionController(new ControllerValidatorMock(), transactionRepository);
    });

    it('should have a handler method', () => {
      expect(updateTransactionsController.handle).to.exist.which.be.a('function');
    });

    it('should have a transaction repository attribute', () => {
      expect(updateTransactionsController._getPrivateAttr('transactionRepository')).to.exist;
    });
  });

  describe('Method: handle', async () => {
    let handle;

    before(async () => {
      transactionRepository = new TransactionRepositoryMock(transactionsMock);
      updateTransactionsController = new UpdateTransactionController(new ControllerValidatorMock(), transactionRepository);
      handle = await updateTransactionsController.handle(httpRequestMock);
    });

    it('should have updated the transaction', () => {
      Object.keys(httpRequestMock.body).map((key) => {
        expect(transactionRepository.transactionsMock[0][key]).to.exist.which.be.equal(httpRequestMock.body[key]);
        return null;
      });
    });

    it('should return status 200 and the updated transaction on body', () => {
      expect(handle.statusCode).to.be.equal(200);
      Object.keys(httpRequestMock.body).map((key) => {
        expect(handle.body[key]).to.be.equal(httpRequestMock.body[key]);
        return null;
      });
    });
  });
});
