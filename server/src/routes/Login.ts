import { Application } from 'express';
import { makeRoute } from '../adpters/RouteAdapter';
import { LoginController } from '../controllers/login/Login';
import { UserRepository } from '../repositories/User';
import { LoginValidator } from '../validators/login/Login';
import { BaseRouter } from './base';

export class LoginRoutes implements BaseRouter {
  // TODO: change 'routes' to a better, most descriptive name
  public loadRoutes(app: Application): void {
    app.post('/login', makeRoute(new LoginController(new LoginValidator(new UserRepository()), new UserRepository())));
  }
}
