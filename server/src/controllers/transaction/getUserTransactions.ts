import { BaseController } from '../Base';
import { getUserTransactionsValidation } from '../../validators/transactions/getUserTransactions';
import { TransactionRepository } from '../../repositories/Transaction';
import { HttpResponse } from '../../protocols/HttpResponse';
import { HttpRequest } from '../../protocols/HttpRequest';

export class GetUserTransactionsController extends BaseController {
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
