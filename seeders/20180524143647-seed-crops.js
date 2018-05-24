'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Crops', [{
        name: 'Rice',
        cost: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Corn',
        cost: 1500,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Wheat',
        cost: 1200,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Tomato',
        cost: 2000,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Apple',
        cost: 3000,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Crops', null, {});
  }
};
