import { HttpRequest } from '../../protocols/HttpRequest';
import { HttpResponse } from '../../protocols/HttpResponse';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../Base';

export class UpdateUserValidator extends ControllerValidator {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    super();
    this.userRepository = userRepository;
  }

  async validate(request: HttpRequest): Promise<HttpResponse> {
    const { userId } = request.params;
    const requestUserId = request.userId;
    const userExists = await this.userRepository.read(userId);
    // Se o usuário existe
    if (userExists) {
      // Se o usuário tiver o mesmo id do requester
      if (userExists.id === requestUserId) {
        return {
          statusCode: 200,
          body: {},
        };
      }
      // Se o usuário não tiver o mesmo id do requester
      return {
        statusCode: 401,
        body: 'Usuário não é dono do recurso',
      };
    }
    // Se o usuário não existir
    return {
      statusCode: 404,
      body: 'Usuário não encontrado',
    };
  }
}
