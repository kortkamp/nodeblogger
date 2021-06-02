var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var servicesRouter = require('./routes/services');
var blogRouter = require('./routes/blog');
var adminRouter = require('./routes/admin');

const PostController = require('./database/controllers/PostController');

var app = express();



global.postsData =[];

// Load All Blog Posts in Memory
(async() => {
    postsData = await PostController.listAllPosts();
    
    // build all page names replacing 
    postsData.forEach(element => {
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
//app.use(express.static(path.join(__dirname, 'public/main')));


app.use('/', servicesRouter);
app.use('/', blogRouter);
//app.use('/blog', blogRouter);
app.use('/admin',adminRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//$ENV:DEBUG = "kortkamp.org:*"; npm run devstart
