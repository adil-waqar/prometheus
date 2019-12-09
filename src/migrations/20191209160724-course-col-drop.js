'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Courses', 'departmentId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Courses', 'departmentId', {
      type: 'foreign key',
      name: 'Courses_departmentId_fkey',
      references: {
        table: 'Departments',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  }
};
