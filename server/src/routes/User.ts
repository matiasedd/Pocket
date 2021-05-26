import { Application } from 'express';
import { makeRoute } from '../adpters/RouteAdapter';
import { GetAllUsersController } from '../controllers/user/GetAllUsers';
import { GetUserController } from '../controllers/user/GetUser';
import { AddUserController } from '../controllers/user/AddUser';
import { auth } from '../middlewares/Auth';
import { UserRepository } from '../repositories/User';
import { getUserValidator } from '../validators/users/GetUser';
import { addUserValidator } from '../validators/users/AddUser';
import { BaseRouter } from './base';
import { UpdateUserController } from '../controllers/user/UpdateUser';
import { updateUserValidator } from '../validators/users/UpdateUser';

export class UserRoutes implements BaseRouter {
  // TODO: change 'routes' to a better, most descriptive name
  public loadRoutes(app: Application): void {
    app.get('/users', makeRoute(new GetAllUsersController(new UserRepository())));
    app.get('/users/:userId', auth, makeRoute(new GetUserController(getUserValidator, new UserRepository())));
    app.post('/users', makeRoute(new AddUserController(addUserValidator, new UserRepository())));
    app.put('/users/:userId', auth, makeRoute(new UpdateUserController(updateUserValidator, new UserRepository())));
  }
}
