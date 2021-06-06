const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Config = require('./models/Config');
const Contact = require('./models/Contact');


(async() => {
    // Create necessary tables
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
 
})();

