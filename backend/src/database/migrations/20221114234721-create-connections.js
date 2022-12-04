'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Connections', {
      user1_id: {
        allowNull:false,
        type:Sequelize.INTEGER,
        primaryKey: true, 
        references: {
          model:'Users',
          key:'id'
        }
      },
      user2_id: {
        allowNull:false,
        type:Sequelize.INTEGER,
        primaryKey: true, 
        references: {
          model:'Users',
          key:'id'
        }
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
    await queryInterface.dropTable('Connections');
  }
};