'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {

    static associate(models) {
      Messages.belongsTo(models.Users, {
        foreignKey: "sender_id",
        as: "sender"
      });

      Messages.belongsTo(models.Users, {
        foreignKey: "receiver_id",
        as: "receiver"
      });
    }
  }

  Messages.init({
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Messages',
  });

  return Messages;
};