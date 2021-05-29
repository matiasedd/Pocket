import { createAttrs } from '../../models/Transaction';
import { HttpRequest } from '../../protocols/HttpRequest';
import { HttpResponse } from '../../protocols/HttpResponse';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../Base';

export class AddTransactionValidator extends ControllerValidator {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    super();
    this.userRepository = userRepository;
  }

  async validate(request: HttpRequest): Promise<HttpResponse> {
    const userId = request.body.user_id;
    const { requestUserId } = request.userId;
    const userExists = await this.userRepository.read(userId);
    // Se o usuário existir e se o usuário for o dono do recurso sendo criado
    if (userExists && userExists.id === requestUserId) {
      // Se a transação possui todos os atributos requeridos
      let hasAllAttrs = true;
      const missgingAttrs = [];
      createAttrs.forEach((key) => {
        if (request.body[key] === undefined) {
          hasAllAttrs = false;
          missgingAttrs.push(key);
        }
      });
      if (!hasAllAttrs) {
        return {
          statusCode: 400,
          body: {
            missgingAttrs,
          },
        };
      }
      // TODO: verificar se os atributos da transaction possuem valores válidos
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
