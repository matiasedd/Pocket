import { DataTypes } from 'sequelize';
import { UserPasswordInputModel, UserPasswordModel } from '../../models/UserPassword';
import { sequelize } from '../Sequelize';
import { UserEntity } from './User';

export const UserPassword = sequelize.define<UserPasswordModel, UserPasswordInputModel>('UserPassword', {
  id: {
    primaryKey: true,
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: UserEntity,
      key: 'id',
    },
  },
  softDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'soft_delete',
  },
},
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
