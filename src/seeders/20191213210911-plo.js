'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Plos',
      [
        {
          no: 1,
          programId: 'BCE',
          createdAt: new Date(),
          updatedAt: new Date(),
          threshold: 40
        },
        {
          no: 2,
          programId: 'BCE',
          createdAt: new Date(),
          updatedAt: new Date(),
          threshold: 50
        },
        {
          no: 3,
          programId: 'BCE',
          createdAt: new Date(),
          updatedAt: new Date(),
          threshold: 60
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Plos', null, {});
  }
};
