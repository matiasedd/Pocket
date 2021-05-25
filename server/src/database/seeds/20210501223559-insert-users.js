module.exports = {
  up: async (queryInterface, Sequelize) => {
    const a = 1;
    return queryInterface.bulkInsert('User', [
      {
        id: '7396a129-5cec-48bd-b15f-102aadcde7db',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@email.com',
      },
      {
        id: '9ac980c4-6e14-46f9-9dea-59fd256e5936',
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('User', { id: '7396a129-5cec-48bd-b15f-102aadcde7db' }).then(() => {
    queryInterface.bulkDelete('User', { id: '9ac980c4-6e14-46f9-9dea-59fd256e5936' });
  }),
};
