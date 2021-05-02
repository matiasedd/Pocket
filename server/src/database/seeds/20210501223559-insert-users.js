'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [
      {
        id: '84b93cbb-1b0e-4c14-8851-19b33f0a4a77',   // ...because Sequelize's STUPID bulkInsert does not FUCKING handle defaultValue for uuid
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@email.com',
      },
      {
        id: '152fdf88-e81d-41b0-b393-de7eb967fd41',
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com',
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
