'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      // relacion N:N con User para favoritos
      Game.belongsToMany(models.User, {
        through: 'Favorite',
        as: 'UserWhoFavorited',
        foreignKey: 'gameId',
        otherKey: 'userId'
      });

      // relacion N:N con User para la biblioteca
      Game.belongsToMany(models.User, {
        through: 'Library',
        as: 'UserWhoOwn',
        foreignKey: 'gameId',
        otherKey: 'userId'
      });
    }
  }
  Game.init({
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    genres: DataTypes.STRING,
    state: { 
      type:DataTypes.STRING,
      defaultValue: "No iniciado",
      validate: {
      isIn: [['Completado', 'En progreso', 'No iniciado']]
    }},
    hoursplayed: DataTypes.INTEGER
  }, 
  {
    sequelize,
    modelName: 'Game',
  });

  return Game;
};