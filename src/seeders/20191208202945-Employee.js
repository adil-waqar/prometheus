const uuid = require('uuid');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Employees',
      [
        {
          id: uuid.v1(),
          name: 'Fawad Hussain',
          designation: 'Research Associate',
          departmentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          password: 'fawad'
        },
        {
          id: uuid.v1(),
          name: 'Ahmar Rashid',
          designation: 'Dean',
          departmentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          password: 'ahmar'
        },
        {
          id: uuid.v1(),
          name: 'Faheem Akhtar',
          designation: 'Controller Examination',
          departmentId: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          password: 'faheem'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Employees', null, {});
  }
};
