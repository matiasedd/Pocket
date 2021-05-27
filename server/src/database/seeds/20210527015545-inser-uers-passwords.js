'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserPassword', [
      {
        userId: '7396a129-5cec-48bd-b15f-102aadcde7db',
        id: '$2y$10$a47csl24JSbrXiy9mW.Tced0sxtrEjeDHQi.CAKwQDUKOFmQVq81K',   // 'johnpass'
      },
      {
        userId: '9ac980c4-6e14-46f9-9dea-59fd256e5936',
        id: '$2y$10$WvsfpzbUDhVWu7t4zwd2wODDOLgwtqTF7w.bfySgpBW3ExqFOcOvq'    // 'janepass'
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('UserPassword', { userId: '7396a129-5cec-48bd-b15f-102aadcde7db' }).then(() => {
      queryInterface.bulkDelete('UserPassword', { userId: '9ac980c4-6e14-46f9-9dea-59fd256e5936' });
    }
};
