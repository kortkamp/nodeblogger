const Sequelize = require('sequelize');
const database = require('../db');

const Comment = database.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  parent_post: Sequelize.STRING,
  parent_comment: {
    type: Sequelize.INTEGER,
  },
  author: Sequelize.STRING,
  email: Sequelize.STRING,
  content: Sequelize.TEXT,

});

module.exports = Comment;
