import { BaseRouter } from './base';
import { TransactionRoutes } from './Transaction';
import { UserRoutes } from './User';
import { LoginRoutes } from './Login';

const routers: BaseRouter[] = [
  new TransactionRoutes(),
  new UserRoutes(),
  new LoginRoutes(),
];

export default routers;
