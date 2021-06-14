const Sequelize = require('sequelize');
const database = require('../db');

const User = database.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  admin: Sequelize.BOOLEAN,
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
    allowNull: false,
    unique: true,
  },
  phone: {
    type: Sequelize.DOUBLE,
    validate: {
      len: [8, 14],
    },
  },
});

module.exports = User;
