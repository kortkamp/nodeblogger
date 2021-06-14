const Sequelize = require('sequelize');
const {
  host, port, user, password, database,
} = require('../db_info');

const sequelize = new Sequelize(database, user, password, { dialect: 'mysql', host, logging: false });
module.exports = sequelize;
