'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

   return queryInterface.bulkInsert('Crops', [
    {
      name: 'rice',
      cost: 100,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'wheat',
      cost: 80,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'corn',
      cost: 50,
      createdAt: new Date (),
      updatedAt: new Date ()
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
