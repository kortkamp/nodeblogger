const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Config = require('./models/Config');
const Contact = require('./models/Contact');
const Subscriber = require('./models/Subscriber')

const mysql = require('mysql2/promise');

const  { host, port, user, password, database } = require('../db_info');


(async() => {
    // Create necessary tables

    
    const connection = await mysql.createConnection({ host, port, user, password });
    //const sequelize = new Sequelize('family', 'user', 'password', {dialect: 'mysql', host: 'localhost'});
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);;


    await User.sync({force:true});
    await User.create({
        username:"admin",
        password:"admin",
        admin:true,
        name:"The Boss",
        email:"admin@example.com",
        phone:999999999,
    })

    await Post.sync();

    await Comment.sync();

    await Config.sync({force:true});
    await Config.create({
        name:"default",
        site_title:"MY NODE.JS BLOG",
        site_description:"Basic description about my blog",
        admin_email:"admin@example.com"
    })

    await Contact.sync();


    await Subscriber.sync();
    
    return;
})();

