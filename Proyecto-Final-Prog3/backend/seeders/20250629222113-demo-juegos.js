'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const API_KEY = '23f40d29a50a413f81b29e506ab0e968'
      const res = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
      const data = await res.json();

      const  games = data.results.map(game => ({
        title: game.name,
        image: game.background_image,
        description: game.description_raw,
        state: "completed",
        hoursplayed: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      return queryInterface.bulkInsert("Games", games);
    } 
    catch (error) {
      console.log("Error al llamar a la API", error);
      
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Games', null, {})
  }

};



