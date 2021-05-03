import { HttpRequest } from '../../protocols/HttpRequest';
import { HttpResponse } from '../../protocols/HttpResponse';
import { UserRepository } from '../../repositories/User';
import { BaseController } from '../Base';

export class GetAllUsersController extends BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const userRepo = new UserRepository();
    const users = await userRepo.readAll();
    return {
      statusCode: 200,
      body: users,
    };
  }
}
