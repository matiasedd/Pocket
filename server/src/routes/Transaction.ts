import { Application } from 'express';
import { makeRoute } from '../adpters/RouteAdapter';
import { AddTransactionController } from '../controllers/transaction/AddTransaction';
import { GetTransactionController } from '../controllers/transaction/GetTransaction';
import { GetUserTransactionsController } from '../controllers/transaction/GetUserTransactions';
import { UpdateTransactionController } from '../controllers/transaction/UpdateTransaction';
import { auth } from '../middlewares/Auth';
import { TransactionRepository } from '../repositories/Transaction';
import { UserRepository } from '../repositories/User';
import { AddTransactionValidator } from '../validators/transactions/AddTransaction';
import { GetTransactionValidator } from '../validators/transactions/GetTransaction';
import { GetUserTransactionsValidator } from '../validators/transactions/GetUserTransactions';
import { UpdateTransactionValidator } from '../validators/transactions/UpdateTransaction';
import { BaseRouter } from './base';

export class TransactionRoutes implements BaseRouter {
  public loadRoutes(app: Application): void {
    app.get('/users/:userId/transactions', auth, makeRoute(
      new GetUserTransactionsController(
        new GetUserTransactionsValidator(
          new UserRepository(),
        ),
        new TransactionRepository(),
      ),
    ));
    app.get('/transactions/:transactionId', auth, makeRoute(
      new GetTransactionController(
        new GetTransactionValidator(
          new UserRepository(),
          new TransactionRepository(),
        ),
        new TransactionRepository(),
      ),
    ));
    app.post('/transactions', auth, makeRoute(
      new AddTransactionController(
        new AddTransactionValidator(
          new UserRepository(),
        ),
        new TransactionRepository(),
      ),
    ));
    app.put('/transactions/:transactionId', auth, makeRoute(
      new UpdateTransactionController(
        new UpdateTransactionValidator(
          new UserRepository(),
          new TransactionRepository(),
        ),
        new TransactionRepository(),
      ),
    ));
  }
}
