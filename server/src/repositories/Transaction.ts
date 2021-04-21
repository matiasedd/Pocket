import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import { BaseRespository } from './Base';

export class TransactionRepository extends BaseRespository {
  private repo = getRepository('Transaction');

  async read(id: string): Promise<Transaction> {
    const transaction = await this.repo.findOne({ id }) as unknown as Transaction;
    return transaction;
  }

  async readByUser(user: string): Promise<Transaction[]> {
    const transactions = await this.repo.find({ user }) as unknown as Transaction[];
    return transactions;
  }

  async insert(transaction: Transaction): Promise<Transaction> {
    await this.repo.save(transaction);
    return transaction;
  }

  async update(transaction: Transaction): Promise<Transaction> {
    const { id } = transaction;
    await this.repo.update({ id }, transaction);
    return transaction;
  }

  async delete(transaction: Transaction): Promise<boolean> {
    const { id } = transaction;
    const transactionExists = !!(await this.repo.findOne({ id }));
    await this.repo.delete({ id });
    return transactionExists;
  }
}
