require('dotenv').config();

module.exports = 

{
  "development": {
    "username": process.env.DB_USER || null,
    "password": process.env.DB_PWD || null,
    "database": process.env.DB_NAME || null,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "logging": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
