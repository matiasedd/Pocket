import { HttpResponse } from '../../protocols/HttpResponse';
import { UserRepository } from '../../repositories/User';
import { BaseController } from '../Base';

export class GetAllUsersController extends BaseController {
  private userRepository: UserRepository;

  constructor(repository: UserRepository) {
    super();
    this.userRepository = repository;
  }

  async handle(): Promise<HttpResponse> {
    const users = await this.userRepository.readAll();
    return {
      statusCode: 200,
      body: users,
    };
  }
}
