import { HttpRequest } from '../../protocols/HttpRequest';
import { HttpResponse } from '../../protocols/HttpResponse';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../Base';

export class GetUserTransactionsValidator extends ControllerValidator {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    super();
    this.userRepository = userRepository;
  }

  async validate(request: HttpRequest): Promise<HttpResponse> {
    const { userId } = request.params;
    const userExists = await this.userRepository.read(userId);
    if (userExists) {
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
