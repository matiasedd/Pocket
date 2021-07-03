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
    created_at: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updated_at: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    title: {
      type: Sequelize.DataTypes.STRING,
      defaultValue: false,
      allowNull: true,
    },
    value: {
      type: Sequelize.DataTypes.DOUBLE(2),
      defaultValue: 0.00,
      allowNull: true,
    },
    category: {
      type: Sequelize.DataTypes.STRING,
      defaultValue: false,
      allowNull: true,
    },
    type: {
      type: Sequelize.DataTypes.STRING,
      defaultValue: false,
      allowNull: false,
    },
    description: {
      type: Sequelize.DataTypes.STRING,
      defaultValue: false,
      allowNull: true,
    },
    isFixed: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
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
