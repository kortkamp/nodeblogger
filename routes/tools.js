var express = require('express');
var router = express.Router();

const UserController = require('../database/controllers/UserController');

const PostController = require('../database/controllers/PostController');



async function updatePostCache(){
    postsData = await PostController.listAllPosts();
        
        // build all page names replacing 
        postsData.forEach(element => {
            element.path = String(element.title).toLowerCase().replace(/ /g, '-');
        });
}

router.get("/",(req, res) => {
    return res.send("logado as user " + req.userId) 
});

router.get("/editor", (req,res) => {  

    PostController.listAllHeaders().then(postHeaderList => {
        //console.log(postList)
    
        res.render("editor", {
            // dataFields must receive all fields of data we want to edit
            postList:postHeaderList,
            dataFields:PostController.getModelFields(),
        });
    
    });
    
});

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
        res.header("new-token", "654654654654654-----");
        res.send(response);
    }).catch(error => {
        return res.status(400).json({ error: err.message });
    })
});

router.post('/article',function(req,res,next){
    
    if(req.body)
        PostController.postArticle(Object.assign(req.body)).then(response => { 
            res.header("new-token", "654654654654654-----");
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


module.exports = router;