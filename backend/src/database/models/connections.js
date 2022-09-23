'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Connections extends Model {
    
    static associate(models) {
    }
  }
  Connections.init({
    connected: DataTypes.JSON,
    request: DataTypes.JSON,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Connections',
  });
  return Connections;
};