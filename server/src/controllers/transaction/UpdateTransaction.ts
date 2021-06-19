import { TransactionRepository } from '../../repositories/Transaction';
import { HttpResponse } from '../../protocols/HttpResponse';
import { HttpRequest } from '../../protocols/HttpRequest';
import { BaseAssertiveController } from '../BaseAssertive';
import { ControllerValidator } from '../../validators/Base';
import { TransactionInputModel, updateableAttrs } from '../../models/Transaction';

export class UpdateTransactionController extends BaseAssertiveController {
  private transactionRepository: TransactionRepository;

  constructor(validator: ControllerValidator, repository: TransactionRepository) {
    super(validator);
    this.transactionRepository = repository;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const updatedTransaction = {} as TransactionInputModel;
    updateableAttrs.forEach((key) => {
      // Atualiza somente os atributos que foram passados no body da request
      if (request.body[key] !== undefined) {
        updatedTransaction[key] = request.body[key];
      }
    });
    // Como o id precisa ser setado e não é atualizável, passamos ele manualmente
    updatedTransaction.id = request.body.id;
    const transaction = await this.transactionRepository.update(updatedTransaction);
    return {
      statusCode: 200,
      body: transaction,
    };
  }
}
