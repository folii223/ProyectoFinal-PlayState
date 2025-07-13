'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      //Sin asociaciones
    }
  }
  Game.init({
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    genres: DataTypes.STRING,
    state: { 
      type:DataTypes.STRING,
      defaultValue: "Pendiente",
      },
    hoursplayed: DataTypes.INTEGER,
    comment: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'Game',
  });

  return Game;
};