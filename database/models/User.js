const Sequelize = require('sequelize');
const database = require('../db');

const User = database.define('user',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username:Sequelize.STRING,
    name:Sequelize.STRING,
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.DOUBLE,
        validate: {
            len: [8, 14],
        },
    },
    
})