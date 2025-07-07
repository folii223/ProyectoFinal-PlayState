'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Relación N:N con Game para la biblioteca
      User.belongsToMany(models.Game, {
        through: 'Library',
        as: 'Library',
        foreignKey: 'userId',
        otherKey: 'gameId'
      });
    }
  }
  Library.init({
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Library',
  });
  return Library;
};