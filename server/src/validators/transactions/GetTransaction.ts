import { HttpRequest } from '../../protocols/HttpRequest';
import { HttpResponse } from '../../protocols/HttpResponse';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../Base';

export class GetTransactionValidator extends ControllerValidator {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    super();
    this.userRepository = userRepository;
  }

  async validate(request: HttpRequest): Promise<HttpResponse> {
    const { userId } = request.params;
    const { requestUserId } = request.userId;
    const userExists = await this.userRepository.read(userId);
    // Se o usuário existir e se o usuário for o dono do recurso acessado
    if (userExists && userExists.id === requestUserId) {
      return {
        statusCode: 200,
        body: {},
      };
    }
    return {
      statusCode: 404,
      body: {
        message: 'Usuário não encontrado',
      },
    };
  }
}
