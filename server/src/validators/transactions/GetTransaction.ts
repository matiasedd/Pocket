import { HttpRequest } from '../../protocols/HttpRequest';
import { HttpResponse } from '../../protocols/HttpResponse';
import { TransactionRepository } from '../../repositories/Transaction';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../Base';

export class GetTransactionValidator extends ControllerValidator {
  private userRepository: UserRepository;

  private transactionRepository: TransactionRepository;

  constructor(userRepository: UserRepository, transactionRepository: TransactionRepository) {
    super();
    this.userRepository = userRepository;
    this.transactionRepository = transactionRepository;
  }

  async validate(request: HttpRequest): Promise<HttpResponse> {
    const { userId } = request;
    const { requestUserId } = request.userId;
    const { transactionId } = request.params;
    const userExists = await this.userRepository.read(userId);
    // Se o usuário existir
    if (userExists) {
      // Se o usuário tiver o mesmo id do requester
      if (userExists.id === requestUserId) {
        const transactionExists = await this.transactionRepository.read(transactionId);
        // Se a transação existir
        if (transactionExists) {
          // Se a transação pertencer ao usuário
          if (transactionExists.userId === userId) {
            return {
              statusCode: 200,
              body: {},
            };
          }
          // Se a transação não pertencer ao usuário
          return {
            statusCode: 403,
            body: 'Usuário não é dono do recurso',
          };
        }
        // Se a transação não existir
        return {
          statusCode: 404,
          body: 'Transação não encontrada',
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
