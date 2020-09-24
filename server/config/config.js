const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "go_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "go_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "b34dd523e32273",
    "password": process.env.DB_PASSWORD,
    "database": "heroku_bc96e46bddd59a3",
    "host": "us-cdbr-east-02.cleardb.com",
    "dialect": "mysql"
  }
}