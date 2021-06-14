const express = require('express');

const router = express.Router();
const fs = require('fs');
const path = require('path');

const matter = require('gray-matter');
const mail = require('@sendgrid/mail');
const commentController = require('../database/controllers/CommentController');
const PostController = require('../database/controllers/PostController');

const utils = require('../utils');

// gray-matter to read the .md files better

router.get('/author/:author', (req, res, next) => {
  const postsByAuthor = [];
  for (post of postsData) {
    if (post.author === req.params.author) { postsByAuthor.push(post); }
  }

  res.render('postsList', {
    pageTitle: req.params.author,
    site: siteConfig,

    // linkList receive an Array of objects with same structure as db table.
    postsList: postsByAuthor,

    authors: Array.from(authors),
    keywords: Array.from(keywords),
    lastPosts: postsData.slice(-5).reverse(),

  });
});

router.get('/keyword/:keyword', (req, res, next) => {
  const postsByKeyword = [];
  for (post of postsData) {
    if (post.keywords.includes(req.params.keyword)) {
      postsByKeyword.push(post);
    }
  }

  res.render('postsList', {
    pageTitle: req.params.author,
    site: siteConfig,

    // linkList receive an Array of objects with same structure as db table.
    postsList: postsByKeyword,

    authors: Array.from(authors),
    keywords: Array.from(keywords),
    lastPosts: postsData.slice(-5).reverse(),

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
      menu: postsData,
      title: siteConfig.site_title,
      site: siteConfig,
      authors: Array.from(authors),
      keywords: Array.from(keywords),
      lastPosts: postsData.slice(-5).reverse(),
    });
  }
});

/*
router.get("/tree", (req,res) => {
  const file = matter.read(path.join(process.cwd() , 'public','htree.htm'));
  res.render("tree", {
    menu: postsData,
    title: site.title,
    site:siteConfig,
    treeBody:file.content
  });
});
*/

router.get('/contact', (req, res) => {
  // const file = matter.read(path.join(process.cwd() , 'public' , 'contact.htm'));
  res.render('contact', {
    menu: postsData,
    title: 'Contato',
    site: siteConfig,

    adminEmail: siteConfig.admin_email,
    authors: Array.from(authors),
    keywords: Array.from(keywords),
    lastPosts: postsData.slice(-5).reverse(),
  });
});

// Main blog article constructor and renderer
router.get('/:article', (req, res, next) => {
  let post;

  // search  article in cached articles list
  if (post = postsData.find((item) => item.path === req.params.article)) {
    PostController.addView(post.id);

    const md = require('markdown-it')();
    const result = md.render(post.content);

    commentController.getComments(req.params.article).then((commentsArray) => {
      for (index in commentsArray) {
        commentsArray[index].create_date = utils.formatDateTime(commentsArray[index].createdAt);
      }

      res.render('blog', {

        pageTitle: siteConfig.site_title,

        articleId: post.id,
        site: siteConfig,
        postBody: result,
        menu: postsData,
        title: post.title,
        description: post.description,
        article: req.params.article,
        page_name: req.params.article,
        comments: commentsArray,
        allow_commentary: post.allow_commentary,
        views: post.views,
        likes: post.likes,
        authors: Array.from(authors),
        keywords: Array.from(keywords),
        lastPosts: postsData.slice(-5).reverse(),
      });
    });
  } else { next(); }
});

module.exports = router;
