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
      references: {
        model: {
          tableName: 'User',
        },
        key: 'id',
      },
    },
  }),

  down: async (queryInterface, Sequelize) => queryInterface.dropTable('User'),
};
