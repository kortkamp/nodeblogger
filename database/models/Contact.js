const Sequelize = require('sequelize');
const database = require('../db');

const Contact = database.define('contact',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    phone:{
        type:Sequelize.STRING, 
    },
    message:{
        type:Sequelize.TEXT,
        allowNull:false,
    }

})

module.exports = Contact;