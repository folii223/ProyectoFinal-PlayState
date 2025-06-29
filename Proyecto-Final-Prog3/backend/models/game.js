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
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    state: DataTypes.STRING,
    hoursplayed: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });

  return Game;
};