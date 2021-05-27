import { Application } from 'express';
import { makeRoute } from '../adpters/RouteAdapter';
import { GetUserController } from '../controllers/user/GetUser';
import { AddUserController } from '../controllers/user/AddUser';
import { auth } from '../middlewares/Auth';
import { UserRepository } from '../repositories/User';
import { getUserValidator } from '../validators/users/GetUser';
import { addUserValidator } from '../validators/users/AddUser';
import { BaseRouter } from './base';
import { UpdateUserController } from '../controllers/user/UpdateUser';
import { updateUserValidator } from '../validators/users/UpdateUser';
import { DeleteUserController } from '../controllers/user/DeleteUser';
import { deleteUserValidator } from '../validators/users/DeleteUser';

export class UserRoutes implements BaseRouter {
  // TODO: change 'routes' to a better, most descriptive name
  public loadRoutes(app: Application): void {
    app.get('/users/:userId', auth, makeRoute(new GetUserController(getUserValidator, new UserRepository())));
    app.post('/users', makeRoute(new AddUserController(addUserValidator, new UserRepository())));
    app.put('/users/:userId', auth, makeRoute(new UpdateUserController(updateUserValidator, new UserRepository())));
    app.delete('/users/:userId', auth, makeRoute(new DeleteUserController(deleteUserValidator, new UserRepository())));
  }
}
