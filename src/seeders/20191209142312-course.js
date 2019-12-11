module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Courses',
      [
        {
          id: 'CS101',
          name: 'Introduction to Programming',
          createdAt: new Date(),
          updatedAt: new Date(),
          cch: 3
        },
        {
          id: 'CS102',
          name: 'Intensive Programming',
          createdAt: new Date(),
          updatedAt: new Date(),
          cch: 3
        },
        {
          id: 'CS221',
          name: 'Data Structures',
          createdAt: new Date(),
          updatedAt: new Date(),
          cch: 3
        },
        {
          id: 'CS103',
          name: 'Very intense programming',
          createdAt: new Date(),
          updatedAt: new Date(),
          cch: 3
        },
        {
          id: 'CE233',
          name: 'Database Management System',
          createdAt: new Date(),
          updatedAt: new Date(),
          cch: 3
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Courses', null, {});
  }
};
