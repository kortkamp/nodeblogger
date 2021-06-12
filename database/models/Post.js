const Sequelize = require('sequelize');
const database = require('../db');

const Post = database.define('post',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:Sequelize.STRING,
    author:Sequelize.STRING,
    keywords:Sequelize.STRING(1000),
    allow_commentary:Sequelize.BOOLEAN,
    public:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    main_menu:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    // for future use
    type:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    },
    // for future use
    status:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    },
    views:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    },
    likes:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    },
    content:Sequelize.TEXT,
    
})




module.exports = Post;
