import { TransactionRepository } from '../../repositories/Transaction';
import { HttpResponse } from '../../protocols/HttpResponse';
import { HttpRequest } from '../../protocols/HttpRequest';
import { BaseAssertiveController } from '../BaseAssertive';
import { ControllerValidator } from '../../validators/Base';

export class GetTransactionController extends BaseAssertiveController {
  private transactionRepository: TransactionRepository;

  constructor(validator: ControllerValidator, repository: TransactionRepository) {
    super(validator);
    this.transactionRepository = repository;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { transactionId } = request.params;
    const transaction = await this.transactionRepository.read(transactionId);
    return {
      statusCode: 200,
      body: transaction,
    };
  }
}
