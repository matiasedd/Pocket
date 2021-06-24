import { HttpRequest } from '../../protocols/HttpRequest';
import { HttpResponse } from '../../protocols/HttpResponse';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../Base';

export class GetUserValidator extends ControllerValidator {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    super();
    this.userRepository = userRepository;
  }

  async validate(request: HttpRequest): Promise<HttpResponse> {
    const { userId } = request.params;
    const { requesterId } = request;
    const userExists = await this.userRepository.read(userId);
    // Se o usuário existe
    if (userExists) {
      // Se o id do usuário é igual o do requester
      if (requesterId === userExists.id) {
        return {
          statusCode: 200,
          body: {},
        };
      }
      // Se o id do usuário é diferente do requester
      return {
        statusCode: 401,
        body: 'Usuário não é dono do recurso',
      };
    }
    // Se o usuário não existe
    return {
      statusCode: 404,
      body: 'Usuário não encontrado',
    };
  }
}
