import { BaseRouter } from './base';
import { TransactionRoutes } from './Transaction';
import { UserRoutes } from './User';

const routers: BaseRouter[] = [
  new TransactionRoutes(),
  new UserRoutes(),
];

export default routers;
