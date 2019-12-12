'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // return queryInterface.addConstraint('Plos', ['programId', 'id'], {
    //   type: 'primary key',
    //   name: 'Plos_programId_pkey'
    // });
    // return queryInterface.sequelize.query(
    //   'ALTER TABLE `Plos` ADD CONSTRAINT `Plos_programId_pkey` PRIMARY KEY (`id`, `programId`)'
    // );
    return queryInterface.sequelize.query(
      'ALTER TABLE "Plos" ADD CONSTRAINT "Plos_programId_pkey" PRIMARY KEY ("id", "programId")'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Plos', 'Plos_programId_pkey');
  }
};
