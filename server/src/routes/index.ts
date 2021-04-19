import { BaseRouter } from './base';
import { TransactionRoutes } from './Transaction';

const routers: BaseRouter[] = [
  new TransactionRoutes(),
];

export default routers;
