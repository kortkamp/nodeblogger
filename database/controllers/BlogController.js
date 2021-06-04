class Controller {
    constructor(modelPath){
        this.Model = require(modelPath);

        this.modelPath = modelPath;
     
        // As we use async inside Class, we need to bind each method, yes cry with me, no solution yet :( 
        this.index = this.index.bind(this);
        this.show = this.show.bind(this);
        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    async index(req, res) {
        try {
            const items = await this.Model.findAll();

            
            return res.json(items);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async show(req, res) {
        try {
            const item = await this.Model.findByPk(req.params.id);

            return res.json(item);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async store(req, res) {
        try {
            const item = await this.Model.create(req.body);

        return res.json(item);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const item = await this.Model.findByPk(req.params.id);

            await item.update(req.body);

            return res.json({ item });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async destroy(req, res) {
        try {
            const item = await this.Model.findByPk(req.params.id);

            await item.destroy();

            return res.json();
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

const UserController = new Controller('../models/User')
const ArticleController = new Controller('../models/Post')
const CommentController = new Controller('../models/Comment')


module.exports = {UserController,ArticleController,CommentController};