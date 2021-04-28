import { TransactionInputModel, TransactionViewModel } from '../models/Transaction';
import { Transaction } from '../database/entities';
import { BaseRespository } from './Base';

export class TransactionRepository extends BaseRespository {
  async read(id: string): Promise<TransactionViewModel> {
    const transaction = await Transaction.findByPk(id);
    return transaction;
  }

  async readByUser(userId: string): Promise<TransactionViewModel[]> {
    const transactions = await Transaction.findAll({ where: { userId } });
    return transactions;
  }

  async insert(transaction: TransactionInputModel): Promise<TransactionViewModel> {
    const brandNewTransaction = Transaction.build(transaction);
    await brandNewTransaction.save();
    return brandNewTransaction;
  }

  async update(updatedTransaction: TransactionInputModel): Promise<TransactionViewModel> {
    const { id } = updatedTransaction;
    const transaction = await Transaction.findByPk(id);
    Object.keys(updatedTransaction).map((key) => {
      transaction[key] = updatedTransaction[key];
      return null;
    });
    await transaction.save();
    return transaction;
  }

  async delete(transaction: TransactionInputModel): Promise<boolean> {
    const { id } = transaction;
    const transactionExists = await Transaction.findByPk(id);
    await transactionExists.destroy();
    return !!transactionExists;
  }

  async deleteById(id: string): Promise<boolean> {
    const transactionExists = await Transaction.findByPk(id);
    await transactionExists.destroy();
    return !!transactionExists;
  }
}
