'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.belongsTo(models.Users,
        {
          foreignKey: "user_id",
          onDelete:'CASCADE'
        })
        Posts.hasMany(models.Likes,
        {
            foreignKey:"post_id",
            onDelete:'CASCADE' 
        })
      /*Posts.belongsToMany(models.Users,
        {
          through: 'Likes',
          as:'a',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        })*/
    }
  }
  Posts.init({
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};