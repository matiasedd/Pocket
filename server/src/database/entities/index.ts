import { TransactionEntity as Transaction } from './Transaction';
import { UserEntity as User } from './User';

Transaction.belongsTo(User, { targetKey: 'id' });
User.hasMany(Transaction, { sourceKey: 'id' });

export {
  Transaction,
  User,
};
