const Sequelize = require('sequelize');
const database = require('../db');


const Relative = database.define('family_member',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    parent_id:{
        type: Sequelize.INTEGER,
        allowNull: false, 
    },
    desc: Sequelize.STRING,
    spouse: Sequelize.STRING,
    birth:{
        type:Sequelize.DATEONLY,
    },
    place:Sequelize.STRING

});

module.exports = Relative;
