import { Application } from 'express';
import { makeRoute } from '../adpters/RouteAdapter';
import { GetUserController } from '../controllers/user/GetUser';
import { AddUserController } from '../controllers/user/AddUser';
import { auth } from '../middlewares/Auth';
import { UserRepository } from '../repositories/User';
import { GetUserValidator } from '../validators/users/GetUser';
import { AddUserValidator } from '../validators/users/AddUser';
import { BaseRouter } from './base';
import { UpdateUserController } from '../controllers/user/UpdateUser';
import { UpdateUserValidator } from '../validators/users/UpdateUser';
import { DeleteUserController } from '../controllers/user/DeleteUser';
import { DeleteUserValidator } from '../validators/users/DeleteUser';

export class UserRoutes implements BaseRouter {
  public loadRoutes(app: Application): void {
    app.get('/users/:userId', auth, makeRoute(
      new GetUserController(
        new GetUserValidator(
          new UserRepository(),
        ),
        new UserRepository(),
      ),
    ));
    app.post('/users', makeRoute(
      new AddUserController(
        new AddUserValidator(),
        new UserRepository(),
      ),
    ));
    app.put('/users/:userId', auth, makeRoute(
      new UpdateUserController(
        new UpdateUserValidator(
          new UserRepository(),
        ),
        new UserRepository(),
      ),
    ));
    app.delete('/users/:userId', auth, makeRoute(
      new DeleteUserController(
        new DeleteUserValidator(
          new UserRepository(),
        ),
        new UserRepository(),
      ),
    ));
  }
}
