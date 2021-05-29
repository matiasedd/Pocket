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
    const { userId } = request.body;
    const { requestUserId } = request.userId;
    const userExists = await this.userRepository.read(userId);
    // Se o usuário existir
    if (userExists) {
      // Se o usuário tiver o mesmo id do requester
      if (userExists.id === requestUserId) {
        // Se a transação a ser criada possui todos os atributos requeridos
        let hasAllAttrs = true;
        const missgingAttrs = [];
        createAttrs.forEach((key) => {
          if (request.body[key] === undefined) {
            hasAllAttrs = false;
            missgingAttrs.push(key);
          }
        });
        // Se a transação a ser criada não possui todos os atributos requeridos
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
      // Se o usuário não tiver o mesmo id do requester
      return {
        statusCode: 401,
        body: 'Usuário não é dono do recurso',
      };
    }
    // Se o usuário não existir
    return {
      statusCode: 401,
      body: 'Usuário não encontrado',
    };
  }
}
