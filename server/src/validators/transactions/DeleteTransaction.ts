import { HttpRequest } from '../../protocols/HttpRequest';
import { HttpResponse } from '../../protocols/HttpResponse';
import { TransactionRepository } from '../../repositories/Transaction';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../Base';

export class DeleteTransactionValidator extends ControllerValidator {
  private userRepository: UserRepository;

  private transactionRepository: TransactionRepository;

  constructor(userRepository: UserRepository, transactionRepository: TransactionRepository) {
    super();
    this.userRepository = userRepository;
    this.transactionRepository = transactionRepository;
  }

  async validate(request: HttpRequest): Promise<HttpResponse> {
    const { transactionId } = request.params;
    const { requesterId } = request;
    const transactionExists = await this.transactionRepository.read(transactionId);
    // Se a transação existir
    if (transactionExists) {
      // Se o usuário é dono da transação
      const transactionOwner = await this.userRepository.read(transactionExists.userId);
      if (transactionOwner.id === transactionExists.userId && transactionExists.userId === requesterId) {
        return {
          statusCode: 200,
          body: {},
        };
      }
      // Se o usuário não é dono da transação
      return {
        statusCode: 403,
        body: 'Usuário não é dono do recurso',
      };
    }
    // Se a transaçao não existir
    return {
      statusCode: 404,
      body: 'Transação não encontrada',
    };
  }
}
