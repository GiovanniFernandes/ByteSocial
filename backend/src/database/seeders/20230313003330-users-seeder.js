'use strict';
const { Users } = require('../models');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt')


module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('123456', salt);
    await Users.bulkCreate([
      {
        username: 'user1',
        password: hash,
        email: 'user1@example.com'
      },
      {
        username: 'user2',
        password: hash,
        email: 'user2@example.com'
      },
      {
        username: 'user3',
        password: hash,
        email: 'user3@example.com'
      },
      {
        username: 'user4',
        password: hash,
        email: 'user4@example.com'
      },
      {
        username: 'user5',
        password: hash,
        email: 'user5@example.com'
      }
    ]);
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
