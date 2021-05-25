import { Application } from 'express';
import { makeRoute } from '../adpters/RouteAdapter';
import { GetUserTransactionsController } from '../controllers/transaction/GetUserTransactions';
import { auth } from '../middlewares/Auth';
import { TransactionRepository } from '../repositories/Transaction';
import { getUserTransactionsValidator } from '../validators/transactions/GetUserTransactions';
import { BaseRouter } from './base';

export class TransactionRoutes implements BaseRouter {
  // TODO: change 'routes' to a better, most descriptive name
  public loadRoutes(app: Application): void {
    app.get('/users/:userId/transactions', auth, makeRoute(new GetUserTransactionsController(getUserTransactionsValidator, new TransactionRepository())));
  }
}
