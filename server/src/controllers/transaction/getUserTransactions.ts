import { BaseController } from '../Base';
import { getUserTransactionsValidation } from '../../validators/getUserTransactions';
import { TransactionRepository } from '../../repositories/Transaction';
import { HttpResponse } from '../../protocols/HttpResponse';
import { HttpRequest } from '../../protocols/HttpRequest';

export class GetUserTransactionsController extends BaseController {
  constructor() {
    super(getUserTransactionsValidation);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const transactionRepo = new TransactionRepository();
    const { userId } = request.params;
    const transactions = await transactionRepo.readByUser(userId);
    return {
      statusCode: 200,
      body: transactions,
    };
  }
}
