module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Transaction', {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    soft_delete: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
    },
  })
  .then(() => queryInterface.addConstraint('Transaction', {
    type: 'FOREIGN KEY',
    fields: ['user_id'],
    name: 'FK_transaction_userId',
    references: {
      table: 'User',
      field: 'id',
    },
    onDelete: 'no action',
    onUpdate: 'no action',
  })),

  down: async (queryInterface, Sequelize) => queryInterface.removeConstraint('Transaction', 'FK_transaction_userId', {})
  .then(() => queryInterface.dropTable('User')),
};
