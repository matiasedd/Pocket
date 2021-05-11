import { Application } from 'express';
import { makeRoute } from '../adpters/RouteAdapter';
import { GetUserTransactionsController } from '../controllers/transaction/getUserTransactions';
import { auth } from '../middlewares/Auth';
import { BaseRouter } from './base';

export class TransactionRoutes implements BaseRouter {
  // TODO: change 'routes' to a better, most descriptive name
  public loadRoutes(app: Application): void {
    app.get('/users/:userId/transactions', auth, makeRoute(new GetUserTransactionsController()));
  }
}
