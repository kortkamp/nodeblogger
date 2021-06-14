const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const servicesRouter = require('./routes/services');
const blogRouter = require('./routes/blog');
const adminRouter = require('./routes/authentication');

const apiRouter = require('./routes/api/apiRoute');
const PostController = require('./database/controllers/PostController');
const { ConfigController } = require('./database/controllers/BlogController');

const app = express();

global.postsData = [];
global.siteConfig = {};
global.authors = new Set();
global.keywords = new Set();

// Load All Blog Posts and configs in Memory
(async () => {
  siteConfig = await ConfigController.getFirstEntry();

  postsData = await PostController.listAllPosts();

  // build all page names replacing
  postsData.forEach((element) => {
    element.keywords.split(' ').forEach((keyword) => keywords.add(keyword));
    authors.add(element.author);
    element.path = String(element.title).toLowerCase().replace(/ /g, '-');
  });
})();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', servicesRouter);
app.use('/', blogRouter);

app.use('/admin', adminRouter);

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    pageTitle: 'ERROR',
    site: siteConfig,
    authors: Array.from(authors),
    keywords: Array.from(keywords),
  });
});

module.exports = app;
