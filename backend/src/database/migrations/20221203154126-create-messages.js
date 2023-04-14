'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sender_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'Users',
          key:'id'
        }
      },
      receiver_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'Users',
          key:'id'
        }
      },
      message: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE,
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
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
