import { Application } from 'express';
import { makeRoute } from '../adpters/RouteAdapter';
import { GetAllUsersController } from '../controllers/user/GetAllUsers';
import { GetUserController } from '../controllers/user/GetUser';
import { auth } from '../middlewares/Auth';
import { UserRepository } from '../repositories/User';
import { getUserValidator } from '../validators/users/GetUser';
import { BaseRouter } from './base';

export class UserRoutes implements BaseRouter {
  // TODO: change 'routes' to a better, most descriptive name
  public loadRoutes(app: Application): void {
    app.get('/users', makeRoute(new GetAllUsersController(new UserRepository())));
    app.get('/users/:userId', auth, makeRoute(new GetUserController(getUserValidator, new UserRepository())));
  }
}
