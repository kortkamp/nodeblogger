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
  for (post of siteCache.getArticlesCache()) {
    if (post.author === req.params.author) { postsByAuthor.push(post); }
  }

  res.render('postsList', {
    pageTitle: req.params.author,
    site: config.data,
    menu: siteCache.getArticlesCache(),

    // linkList receive an Array of objects with same structure as db table.
    postsList: postsByAuthor,

    authors: siteCache.getAuthors(),
    keywords: siteCache.getKeywords(),
    lastPosts: siteCache.getArticlesCache().slice(-5).reverse(),

  });
});

router.get('/keyword/:keyword', (req, res, next) => {
  const postsByKeyword = [];
  for (post of siteCache.getArticlesCache()) {
    if (post.keywords.includes(req.params.keyword)) {
      postsByKeyword.push(post);
    }
  }

  res.render('postsList', {
    pageTitle: req.params.author,
    site: config.data,
    menu: siteCache.getArticlesCache(),

    // linkList receive an Array of objects with same structure as db table.
    postsList: postsByKeyword,

    authors: siteCache.getAuthors(),
    keywords: siteCache.getKeywords(),
    lastPosts: siteCache.getArticlesCache().slice(-5).reverse(),

  });
});

router.get('/', (req, res, next) => {
  // redirect to desired homepage
  if (siteConfig.homepage) {
    req.url = `/${siteConfig.homepage}`;
    console.log(`redirecting to ${req.url}`);
    next();
  } else {
    res.render('blogindex', {
      menu: siteCache.getArticlesCache(),
      title: config.data.site_title,
      site: config.data,
      authors: siteCache.getAuthors(),
      keywords: siteCache.getKeywords(),
      lastPosts: siteCache.getArticlesCache().slice(-5).reverse(),
    });
  }
});

router.get('/contact', (req, res) => {
  // const file = matter.read(path.join(process.cwd() , 'public' , 'contact.htm'));
  res.render('contact', {
    menu: siteCache.getArticlesCache(),
    title: 'Contato',
    site: config.data,

    adminEmail: config.data.admin_email,
    authors: siteCache.getAuthors(),
    keywords: siteCache.getKeywords(),
    lastPosts: siteCache.getArticlesCache().slice(-5).reverse(),
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

      // console.log(post);

      res.render('blog', {
        pageTitle: config.data.site_title,
        articleId: post.id,
        site: config.data,
        postBody: result,
        menu: siteCache.getArticlesCache(),
        title: post.title,
        description: post.description,
        article: req.params.article,
        page_name: req.params.article,
        comments: commentsArray,
        allow_commentary: post.allow_commentary,
        views: post.views,
        likes: post.likes,
        authors: siteCache.getAuthors(),
        keywords: siteCache.getKeywords(),
        lastPosts: siteCache.getArticlesCache().slice(-5).reverse(),
      });
    });
  } else {
    next();
  }
});

module.exports = router;
