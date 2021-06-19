const express = require('express');

const router = express.Router();

const commentController = require('../database/controllers/CommentController');
const PostController = require('../database/controllers/PostController');
const siteCache = require('../cache');
const config = require('../siteConfig');

const utils = require('../utils');

// gray-matter to read the .md files better

router.get('/author/:author', (req, res, next) => {
  const postsByAuthor = [];

  siteCache.getArticlesCache().forEach((article) => {
    if (article.author === req.params.author) { postsByAuthor.push(article); }
  });

  res.render('postsList', {
    pageTitle: req.params.author,
    site: config.data,

    // linkList receive an Array of objects with same structure as db table.
    postsList: postsByAuthor,

    summary: siteCache.getSummary(),

  });
});

router.get('/keyword/:keyword', (req, res, next) => {
  const postsByKeyword = [];

  siteCache.getArticlesCache().forEach((article) => {
    if (article.keywords.includes(req.params.keyword)) {
      postsByKeyword.push(article);
    }
  });
  res.render('postsList', {
    pageTitle: req.params.author,
    site: config.data,

    // linkList receive an Array of objects with same structure as db table.
    postsList: postsByKeyword,

    summary: siteCache.getSummary(),

  });
});

router.get('/', (req, res, next) => {
  // redirect to desired homepage
  if (config.data.homepage) {
    req.url = `/${config.data.homepage}`;
    next();
  } else {
    res.render('blogindex', {

      title: config.data.site_title,
      site: config.data,

      summary: siteCache.getSummary(),
    });
  }
});

router.get('/contact', (req, res) => {
  // const file = matter.read(path.join(process.cwd() , 'public' , 'contact.htm'));
  res.render('contact', {

    title: 'Contato',
    site: config.data,

    adminEmail: config.data.admin_email,

    summary: siteCache.getSummary(),
  });
});

// Main blog article route
router.get('/:article', (req, res, next) => {
  // search  article in cached articles list
  const post = siteCache.getArticlesCache().find((item) => item.path === req.params.article);

  if (post) {
    PostController.addView(post.id);

    const md = require('markdown-it')();
    const result = md.render(post.content);

    commentController.getComments(req.params.article).then((commentsArray) => {
      for (index in commentsArray) {
        commentsArray[index].create_date = utils.formatDateTime(commentsArray[index].createdAt);
      }

      // console.log('posts');
      // console.log(siteCache.getArticlesCache());

      res.render('blog', {
        pageTitle: config.data.site_title,
        articleId: post.id,
        site: config.data,
        postBody: result,
        title: post.title,
        description: post.description,
        article: req.params.article,
        page_name: req.params.article,
        comments: commentsArray,
        allow_commentary: post.allow_commentary,

        views: post.views,
        likes: post.likes,

        summary: siteCache.getSummary(),

      });
    });
  } else {
    next();
  }
});

module.exports = router;
