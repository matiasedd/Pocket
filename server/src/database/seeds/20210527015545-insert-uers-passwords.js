module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('UserPassword', [
    {
      user_id: '7396a129-5cec-48bd-b15f-102aadcde7db',
      id: '$2y$10$ge97IPAPm1h0b19Tf31eaeYnM5sbfgZeLr1G1ki.PJ7vvoZ.edAF6', // 'johnpass'
    },
    {
      user_id: '9ac980c4-6e14-46f9-9dea-59fd256e5936',
      id: '$2y$10$6r/oCsIS2O2HPoA7BnlsautHHl73XVcFGQPcz4wIe1Q.rMAoqsJom', // 'janepass'
    },
  ]),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('UserPassword', { userId: '7396a129-5cec-48bd-b15f-102aadcde7db' })
    .then(() => {
      queryInterface.bulkDelete('UserPassword', { userId: '9ac980c4-6e14-46f9-9dea-59fd256e5936' });
    }),
};
