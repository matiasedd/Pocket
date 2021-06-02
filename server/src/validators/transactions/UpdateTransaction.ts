import { HttpRequest } from '../../protocols/HttpRequest';
import { HttpResponse } from '../../protocols/HttpResponse';
import { TransactionRepository } from '../../repositories/Transaction';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../Base';

export class UpdateTransactionValidator extends ControllerValidator {
  private userRepository: UserRepository;

  private transactionRepository: TransactionRepository;

  constructor(userRepository: UserRepository, transactionRepository: TransactionRepository) {
    super();
    this.userRepository = userRepository;
    this.transactionRepository = transactionRepository;
  }

  async validate(request: HttpRequest): Promise<HttpResponse> {
    const { userId } = request.body;
    const { transactionId } = request.params;
    const { requestUserId } = request.userId;
    const userExists = await this.userRepository.read(userId);
    const transactionExists = await this.transactionRepository.read(transactionId);
    // Se o usuário existir
    if (userExists) {
      // Se o usuário tiver o mesmo id do requester
      if (userExists.id === requestUserId) {
        // Se a transação existir
        if (transactionExists) {
          // Se a transação pertence ao usuário
          if (transactionExists.userId === userId) {
            // TODO: verificar se os atributos a serem atualizados da transaction são válidos
            return {
              statusCode: 200,
              body: {},
            };
          }
          // Se a transação não pertence ao usuário
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
      body: 'Usuário desconhecido',
    };
  }
}
