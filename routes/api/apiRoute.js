const { Router } = require('express');
const routes = Router();

const {UserController,ArticleController,CommentController} = require('../../database/controllers/BlogController');

controllers = {
    users:UserController,
    articles:ArticleController,
    comments:CommentController
}



routes.get('/:service', 
    (req, res, next) => {controllers[req.params.service].index(req, res, next)}
);

routes.get('/:service/:id',
    (req, res, next) => {controllers[req.params.service].show(req, res, next)}
);

routes.post('/:service',
    (req, res, next) => {controllers[req.params.service].store(req, res, next)}
);

routes.put('/:service/:id',
    (req, res, next) => {controllers[req.params.service].update(req, res, next)}
);

routes.delete('/:service/:id',
    (req, res, next) => {controllers[req.params.service].destroy(req, res, next)}
);



module.exports = routes;