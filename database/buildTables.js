const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');






(async() => {
    // Create necessary tables
    await User.sync({force:true});
    await Post.sync();
    await Comment.sync();
 
})();


/*

*/