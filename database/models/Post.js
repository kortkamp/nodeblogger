const Sequelize = require('sequelize');
const database = require('../db');

const Post = database.define('post',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    page_name:Sequelize.STRING,
    title:Sequelize.STRING,
    description:Sequelize.STRING,
    author:Sequelize.STRING,
    keywords:Sequelize.STRING(1000),
    allow_commentary:Sequelize.BOOLEAN,
    type:Sequelize.INTEGER,
    status:Sequelize.INTEGER,
    content:Sequelize.TEXT,
    
})

module.exports = Post;
