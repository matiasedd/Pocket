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
    const { requesterId } = request;
    const userExists = await this.userRepository.read(userId);
    // Se o usuário existir
    if (userExists) {
      // Se o usuário tiver o mesmo id do requester
      if (userExists.id === requesterId) {
        // Se a transação a ser criada possui todos os atributos requeridos
        let hasAllAttrs = true;
        const missingAttrs = [];
        createAttrs.forEach((key) => {
          if (request.body[key] === undefined) {
            hasAllAttrs = false;
            missingAttrs.push(key);
          }
        });
        // TODO: verificar se os atributos da transaction possuem valores válidos
        if (hasAllAttrs) {
          return {
            statusCode: 200,
            body: {},
          };
        }
        // Se a transação a ser criada possui todos os atributos requeridos
        return {
          statusCode: 400,
          body: {
            missingAttrs,
          },
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
