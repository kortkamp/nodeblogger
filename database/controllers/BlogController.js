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
        this.countEntries = this.countEntries.bind(this);
    }

    async index(req, res) {
        try {

            const items = await this.Model.findAll({
                where: req.query,
                //attributes: { exclude: ['content'] }
            });

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

        return res.status(201).json(item);
        } catch (err) {
            return res.status(400).json({ error: err.original.sqlMessage });
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

            return res.status(204).json();
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    // for internal use
    // Return a object with same keys as Model desired , but content is the Datatype of respective field.
    getModelFields(){
        var postDataFields = [];
        
        var postFieldsArray = Object.keys(this.Model.rawAttributes);
        for(let field of postFieldsArray)
            postDataFields.push({
                name:field,
                type:this.Model.rawAttributes[field].type.key
            })
        return postDataFields;
    }

    // for internal use
    // return the number os rows
    async countEntries(){
        try {
            const count = await this.Model.count();
            return {"count":count};
        } catch (err) {
            return { error: err.message ,"count":0};
        }

    }

    // for internal use
    getFirstEntry(){
        
        try {
            return this.Model.findOne({raw:true});
        } catch (err) {
            return { error: err.message };
        }
    }
    
}

const UserController = new Controller('../models/User')
const ArticleController = new Controller('../models/Post')
const CommentController = new Controller('../models/Comment')
const ConfigController = new Controller('../models/Config')
const ContactController = new Controller('../models/Contact')

module.exports = {UserController,ArticleController,CommentController,ConfigController,ContactController};