'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Clos',
      [
        {
          no: 1,
          courseId: 'CS101',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          no: 2,
          courseId: 'CS101',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          no: 3,
          courseId: 'CS101',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clos', null, {});
  }
};
