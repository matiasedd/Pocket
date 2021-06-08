/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';
import { TransactionInputModel, TransactionModel, TransactionViewModel } from '../../src/models/Transaction';
import { Transaction } from '../../src/database/entities';
import { TransactionRepository } from '../../src/repositories/Transaction';

/**
 * Esta classe é um mock da TransactionRepository, que oferece todas as funcionalidades da mesma,
 * sem a necessidade da conexão com o banco de dados. Seu propósito é ser utilizada pelos
 * testes unitários.
 */

export class TransactionRepositoryMock extends TransactionRepository {
  private transactionsMock: Array<TransactionViewModel>;

  constructor(transactionsMock: Array<TransactionViewModel>) {
    super();
    this.transactionsMock = [...transactionsMock];
  }

  async read(id: string): Promise<TransactionViewModel> {
    const transactionFound = this.transactionsMock.find((transaction) => transaction.id === id);
    return Promise.resolve(transactionFound || null);
  }

  async readByUser(userId: string): Promise<TransactionViewModel[]> {
    const transactionFound = this.transactionsMock.filter((transaction) => transaction.userId === userId);
    return Promise.resolve(transactionFound.length > 0 ? [...transactionFound] : null);
  }

  async insert(transaction: TransactionInputModel): Promise<TransactionViewModel> {
    // Declaração dos atributos do parâmetro transaction
    const transactionInput: TransactionInputModel = {
      userId: '',
      title: '',
      value: 0,
      category: '',
      type: '',
      description: '',
      isFixed: false,
      softDelete: false,
    };
    // Verifica se transaction possui todos os atributos necessários
    let hasAllAttrs = true;
    Object.keys(transactionInput).map((key) => {
      if (transaction[key] === undefined) {
        hasAllAttrs = false;
      }
      return null;
    });
    // Transação criada = user + atributos da model (id, createdAt, updatedAt)
    const createdTransaction: TransactionModel = {
      ...transaction,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as TransactionModel;
    if (hasAllAttrs) {
      this.transactionsMock.push(createdTransaction);
    }
    // Só retorna o usuário criado se user tinha todos os atriutos neecssários
    return Promise.resolve(hasAllAttrs ? createdTransaction : null);
  }

  async update(updatedTransaction: TransactionInputModel): Promise<TransactionViewModel> {
    const { id } = updatedTransaction;
    const transactionFound = this.transactionsMock.filter((transaction) => transaction.id === id)[0];
    if (transactionFound) {
      Object.keys(transactionFound).map((key) => {
        transactionFound[key] = updatedTransaction[key];
        return null;
      });
    }
    return Promise.resolve(transactionFound || null);
  }

  async delete(transaction: TransactionInputModel): Promise<boolean> {
    let deleted = false;
    let indexToRemove = -1;
    for (let i = 0; i < this.transactionsMock.length; i++) {
      if (this.transactionsMock[i].id === transaction.id) {
        deleted = true;
        indexToRemove = i;
        break;
      }
    }
    if (deleted) {
      this.transactionsMock.splice(indexToRemove, 1);
    }
    return Promise.resolve(deleted);
  }

  async deleteById(id: string): Promise<boolean> {
    let deleted = false;
    let indexToRemove = -1;
    for (let i = 0; i < this.transactionsMock.length; i++) {
      if (this.transactionsMock[i].id === id) {
        deleted = true;
        indexToRemove = i;
        break;
      }
    }
    if (deleted) {
      this.transactionsMock.splice(indexToRemove, 1);
    }
    return Promise.resolve(deleted);
  }
}
