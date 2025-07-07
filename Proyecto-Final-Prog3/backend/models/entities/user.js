'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Relación N:N con Game para favoritos
      User.belongsToMany(models.Game, {
        through: 'Favorite',
        as: 'Favorites',
        foreignKey: 'userId',
        otherKey: 'gameId'
      });
      
      // Relación N:N con Game para la biblioteca
      User.belongsToMany(models.Game, {
        through: 'Library',
        as: 'Library',
        foreignKey: 'userId',
        otherKey: 'gameId'
        
      });
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};