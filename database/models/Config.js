const Sequelize = require('sequelize');
const database = require('../db');

const Config = database.define('config',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:Sequelize.STRING,
    site_title:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    site_description:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    notify_comments:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: false
    },
    notify_contact:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: true
    },
    styles_file:{
        type:Sequelize.STRING,
        defaultValue: "style"
    }

})

module.exports = Config;