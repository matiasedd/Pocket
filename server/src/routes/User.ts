import { Application } from 'express';
import { makeRoute } from '../adpters/RouteAdapter';
import { GetAllUsersController } from '../controllers/user/getAllUsers';
import { auth } from '../middlewares/Auth';
import { UserRepository } from '../repositories/User';
import { BaseRouter } from './base';

export class UserRoutes implements BaseRouter {
  // TODO: change 'routes' to a better, most descriptive name
  public loadRoutes(app: Application): void {
    app.get('/users', makeRoute(new GetAllUsersController(new UserRepository())));
  }
}
