'use strict';

const sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('Games', 'genres', {
      type: sequelize.STRING,
      allowNull: true
     });
     
     await queryInterface.removeColumn('Games', 'description');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Games', 'genres');

    await queryInterface.addColumn('Games', 'description', {
      type: Sequelize.STRING,
      allowNull: true
    });

  }
}
