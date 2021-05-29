const Sequelize = require('sequelize');
const sequelize = new Sequelize('family', 'user', 'password', {dialect: 'mysql', host: 'localhost'});
module.exports = sequelize;






