import { DataTypes } from 'sequelize';
import { UserModel, UserInputModel } from '../../models/User';
import { sequelize } from '../Sequelize';

export const UserEntity = sequelize.define<UserModel, UserInputModel>('User', {
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
  email: {
    type: DataTypes.STRING(40),
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING(60),
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING(60),
    field: 'last_name',
  },
},
{
  freezeTableName: true,
});
