'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    
    static associate(models) {
      
      Likes.belongsTo(models.Users,
        {
        foreignKey:'user_id',
          onDelete:'CASCADE'
      })

      Likes.belongsTo(models.Posts, {
        foreignKey:'post_id',
          onDelete:'CASCADE'
      })

    }
  }
  Likes.init({
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};