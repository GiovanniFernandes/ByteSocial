'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {

    static associate(models) {
      Users.hasMany(models.Posts, {
        foreignKey:"user_id",
      })

      Users.hasMany(models.Likes,
      {
          foreignKey:"user_id",
      })
      Users.belongsToMany(models.Users,
      {
          through:'Connections',
          foreignKey:'user1_id',
          as:'user1'
      })
      Users.belongsToMany(models.Users,
      {
          through:'Connections',
          foreignKey:'user2_id',
          as:'user2'
      })

    }
  }
  Users.init({
    username: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty:true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        len:{
          args:[6],
          msg:"Senha deve possuir no mínimo 6 dígitos"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isEmail: {
          args: true,
          msg: "E-mail inválido"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};