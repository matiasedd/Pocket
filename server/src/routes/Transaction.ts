import { Application } from 'express';
import { makeRoute } from '../adpters/RouteAdapter';
import { GetTransactionController } from '../controllers/transaction/GetTransaction';
import { GetUserTransactionsController } from '../controllers/transaction/GetUserTransactions';
import { auth } from '../middlewares/Auth';
import { TransactionRepository } from '../repositories/Transaction';
import { UserRepository } from '../repositories/User';
import { GetTransactionValidator } from '../validators/transactions/GetTransaction';
import { GetUserTransactionsValidator } from '../validators/transactions/GetUserTransactions';
import { BaseRouter } from './base';

export class TransactionRoutes implements BaseRouter {
  public loadRoutes(app: Application): void {
    app.get('/users/:userId/transactions', auth, makeRoute(new GetUserTransactionsController(new GetUserTransactionsValidator(new UserRepository()), new TransactionRepository())));
    app.get('/transactions/:transactionId', auth, makeRoute(new GetTransactionController(new GetTransactionValidator(new UserRepository()), new TransactionRepository())));
  }
}
