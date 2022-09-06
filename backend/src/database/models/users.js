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
    nome: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty:true
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        len:{
          args:[6],
          msg:"Senha tem que 6 digitos no minímo"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      
      validate: {
        isEmail: {
          args: true,
          msg: "e-mail invalido"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};