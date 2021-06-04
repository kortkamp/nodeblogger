const { Router } = require('express');
const routes = Router();

const {UserController,ArticleController,CommentController} = require('../../database/controllers/BlogController');


//console.log(UserController.modelPAth)
//console.log(ArticleController.modelPAth)
//console.log(CommentController.modelPAth)

const usersEndPointRouter = require('./apiEndPoint')(UserController);
const articlesEndPointRouter = require('./apiEndPoint')(ArticleController);
const commentsEndPointRouter = require('./apiEndPoint')(CommentController);


routes.use('/users',usersEndPointRouter)
routes.use('/articles',articlesEndPointRouter)
routes.use('/comments',commentsEndPointRouter)


module.exports = routes;


// erro

//os 3 router estão roteando sempre para o primeiro , pqp