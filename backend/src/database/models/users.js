'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {

    static associate(models) {

    }
  }
  Users.init({
    username: {
      type: DataTypes.STRING,
      allowNull : false,
      unique: true,
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
          msg:"Sua senha precisa ter no mínimo 6 digitos."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "E-mail inválido."
        }
      }
    },
    qtd_friends: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:0
    },
    qtd_posts: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:0
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};