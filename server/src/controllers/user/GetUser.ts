import { HttpRequest } from '../../protocols/HttpRequest';
import { HttpResponse } from '../../protocols/HttpResponse';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../../validators/Base';
import { BaseAssertiveController } from '../BaseAssertive';

export class GetUserController extends BaseAssertiveController {
  private userRepository: UserRepository;

  constructor(validator: ControllerValidator, repository: UserRepository) {
    super(validator);
    this.userRepository = repository;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { userEmail } = request;
    const user = await this.userRepository.readByEmail(userEmail);
    return {
      statusCode: 200,
      body: user,
    };
  }
}
