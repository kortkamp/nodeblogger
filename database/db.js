const Sequelize = require('sequelize');

const host = process.env.DB_HOST;

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, { dialect: 'mysql', host, logging: false });

module.exports = sequelize;
