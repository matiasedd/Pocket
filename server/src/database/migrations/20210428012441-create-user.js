module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('User', {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    soft_delete: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  }),

  down: async (queryInterface, Sequelize) => queryInterface.dropTable('User'),
};
