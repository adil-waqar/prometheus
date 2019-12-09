'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Employees', ['departmentId'], {
      type: 'foreign key',
      name: 'Employees_departmentId_fkey',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      references: {
        table: 'Departments',
        field: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'Employees',
      'Employees_departmentId_fkey'
    );
  }
};
