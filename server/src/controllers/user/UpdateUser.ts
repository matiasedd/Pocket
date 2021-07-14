import { updateableAttrs } from '../../models/User';
import { HttpRequest } from '../../protocols/HttpRequest';
import { HttpResponse } from '../../protocols/HttpResponse';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../../validators/Base';
import { BaseAssertiveController } from '../BaseAssertive';

export class UpdateUserController extends BaseAssertiveController {
  private userRepository: UserRepository;

  constructor(validator: ControllerValidator, repository: UserRepository) {
    super(validator);
    this.userRepository = repository;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { userId } = request.params;
    const attrsToUpdate = { ...request.body };
    const user = await this.userRepository.read(userId);
    updateableAttrs.forEach((key) => user[key] = attrsToUpdate[key] || user[key]);
    const updatedUser = await this.userRepository.update(user);
    return {
      statusCode: 200,
      body: updatedUser,
    };
  }
}
