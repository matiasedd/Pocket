module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('UserPassword', {
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
    })
      .then(() => queryInterface.addConstraint('UserPassword', {
        type: 'FOREIGN KEY',
        fields: ['user_id'],
        name: 'FK_userPassword_userId',
        references: {
          table: 'User',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      }));
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('UserPassword', 'FK_userPassword_userId', {})
      .then(() => queryInterface.dropTable('UserPassword'));
  },
};
