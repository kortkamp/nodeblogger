const  { host, port, user, password, database } = require('../db_info');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(database, user, password, {dialect: 'mysql', host: host});
module.exports = sequelize;






