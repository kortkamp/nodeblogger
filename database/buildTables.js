const dotenv = require('dotenv');

dotenv.config();

const mysql = require('mysql2/promise');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Config = require('./models/Config');
const Contact = require('./models/Contact');
const Subscriber = require('./models/Subscriber');

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

(async () => {
  // Create necessary tables

  const connection = await mysql.createConnection({
    host, port, user, password,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  await User.sync({ force: true });
  await User.create({
    username: 'admin',
    password: 'admin',
    admin: true,
    name: 'The Boss',
    email: 'admin@example.com',
    phone: 999999999,
  });

  await Post.sync({ force: true });

  await Comment.sync();

  await Config.sync({ force: true });
  await Config.create({
    name: 'default',
    site_title: 'MY NODE.JS BLOG',
    site_description: 'Basic description about my blog',
    admin_email: 'admin@example.com',
  });

  await Contact.sync();

  await Subscriber.sync();

  process.exit(0);
})();
