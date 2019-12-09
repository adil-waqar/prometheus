module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Departments',
      [
        {
          id: 1,
          name: 'FCSE',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'FCME',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'FEE',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 0,
          name: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Departments', null, {});
  }
};
