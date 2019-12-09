module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Programs',
      [
        {
          id: 'BCE',
          name: 'Bachelors in Computer Engineernig',
          DepartmentId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'BCS',
          name: 'Bachelors in Computer Science',
          DepartmentId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'BEE',
          name: 'Bachelors in Electrical Engineernig',
          DepartmentId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Programs', null, {});
  }
};
