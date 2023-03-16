'use strict';
const { Users } = require('../models');
const Sequelize = require('sequelize');


module.exports = {
  async up (queryInterface, Sequelize) {
    await Users.bulkCreate([
      {
        username: 'user1',
        password: '123456',
        email: 'user1@example.com'
      },
      {
        username: 'user2',
        password: '123456',
        email: 'user2@example.com'
      },
      {
        username: 'user3',
        password: '123456',
        email: 'user3@example.com'
      },
      {
        username: 'user4',
        password: '123456',
        email: 'user4@example.com'
      },
      {
        username: 'user5',
        password: '123456',
        email: 'user5@example.com'
      }
    ]);
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
