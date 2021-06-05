var express = require('express');
var router = express.Router();

const PostController = require('../database/controllers/PostController');

const {UserController,ArticleController,CommentController} = require('../database/controllers/BlogController');

const auth = require('../auth_info');

controllers = {
    users:UserController,
    articles:ArticleController,
    comments:CommentController
}


async function updatePostCache(){
    postsData = await PostController.listAllPosts();
        
        // build all page names replacing 
        postsData.forEach(element => {
            element.path = String(element.title).toLowerCase().replace(/ /g, '-');
        });
}

router.get("/",(req, res) => {
    return res.render("dashboard",{
        tokenExpireTime:auth.tokenExpireTime,
    })
});



router.get("/editor/:dataToEdit", (req,res) => {  
     
        res.render("editor", {
            
            endPointName:req.params.dataToEdit,

            tokenExpireTime:auth.tokenExpireTime,
            
            // dataFields must receive all fields of data we want to edit
            dataFields:controllers[req.params.dataToEdit].getModelFields()  
        });
     
});

/*
router.get('/list',function(req,res,next){
    //console.log(req.query.where)
    if(true){
        PostController.listAllHeaders().then(response => {
            res.send(response);
        }).catch(error => {
            return res.status(400).json({ error: err.message });
        })
    }
});

router.get('/article',function(req,res,next){
    PostController.getPostById(req.query.id).then(response => {
        
        res.send(response);
    }).catch(error => {
        return res.status(400).json({ error: err.message });
    })
});

router.post('/article',function(req,res,next){
    
    if(req.body)
        PostController.postArticle(Object.assign(req.body)).then(response => { 
            
            updatePostCache(); 
            res.send(response);
        });
});

router.delete('/article',function(req,res,next){
    
    if(req.body)
        PostController.deleteArticle(req.body.id).then(response => {  
            updatePostCache();
            res.send(response);
        });
});

*/
module.exports = router;