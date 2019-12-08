'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Students',
      [
        {
          id: 2016035,
          name: 'Adil Waqar',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2016129,
          name: 'Fatima Rahman',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Students', null, {});
  }
};
