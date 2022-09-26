'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull:false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull:false,
        type: Sequelize.STRING
      },
      email: {
        allowNull:false,
        type: Sequelize.STRING,
        unique: true
      },
      qtd_posts: { //Gabriel 
        defaultValue:0,
        allowNull:false,
        type: Sequelize.INTEGER,
        
      },
      qtd_friends: { //Gabriel
        defaultValue:0,
        allowNull:false,
        type: Sequelize.INTEGER,
          
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};