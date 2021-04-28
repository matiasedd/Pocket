import { DataTypes } from 'sequelize';
import { TransactionInputModel, TransactionModel } from '../../models/Transaction';
import { sequelize } from '../Sequelize';
import { UserEntity } from './User';

export const TransactionEntity = sequelize.define<TransactionModel, TransactionInputModel>('Transaction', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  softDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'soft_delete',
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: UserEntity,
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING(80),
  },
  value: {
    type: DataTypes.DECIMAL,
  },
  category: {
    type: DataTypes.STRING(50),
  },
  type: {
    type: DataTypes.STRING(8),
  },
  description: {
    type: DataTypes.STRING(300),
  },
  isFixed: {
    type: DataTypes.BOOLEAN,
  },
},
{
  freezeTableName: true,
});
