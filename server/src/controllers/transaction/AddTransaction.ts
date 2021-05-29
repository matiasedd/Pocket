import { TransactionRepository } from '../../repositories/Transaction';
import { HttpResponse } from '../../protocols/HttpResponse';
import { HttpRequest } from '../../protocols/HttpRequest';
import { BaseAssertiveController } from '../BaseAssertive';
import { ControllerValidator } from '../../validators/Base';
import { createAttrs, TransactionInputModel } from '../../models/Transaction';

export class AddTransactionController extends BaseAssertiveController {
  private transactionRepository: TransactionRepository;

  constructor(validator: ControllerValidator, repository: TransactionRepository) {
    super(validator);
    this.transactionRepository = repository;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const transactionInput = {} as TransactionInputModel;
    createAttrs.forEach((key) => {
      transactionInput[key] = request.body[key];
    });
    const transaction = await this.transactionRepository.insert(transactionInput);
    return {
      statusCode: 200,
      body: transaction,
    };
  }
}
