const express = require('express');

const router = express.Router();

const PostController = require('../database/controllers/PostController');

const {
  UserController, ArticleController, CommentController, ConfigController, ContactController,
} = require('../database/controllers/BlogController');

const auth = require('../auth_info');

controllers = {
  users: UserController,
  articles: ArticleController,
  comments: CommentController,
  configs: ConfigController,
  contacts: ContactController,
};

async function updatePostCache() {
  postsData = await PostController.listAllPosts();

  // build all page names replacing
  postsData.forEach((element) => {
    element.path = String(element.title).toLowerCase().replace(/ /g, '-');
  });
}

router.get('/', (req, res) => {
  let stats;

  (async () => {
    const stats = {};

    stats.articlesNumber = await ArticleController.countEntries();
    stats.commentsNumber = await CommentController.countEntries();
    stats.contactsNumber = await ContactController.countEntries();

    return res.render('dashboard', {
      tokenExpireTime: auth.tokenExpireTime,

      stats,

    });
  })();
});

router.get('/editor/:dataToEdit', (req, res) => {
  res.render('editor', {

    endPointName: req.params.dataToEdit,

    tokenExpireTime: auth.tokenExpireTime,

    // dataFields must receive all fields of data we want to edit
    dataFields: controllers[req.params.dataToEdit].getModelFields(),
  });
});

module.exports = router;
