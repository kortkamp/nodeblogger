var express = require('express');
const { compileClientWithDependenciesTracked } = require('pug');
var router = express.Router();

var mailer = require('../mailer');

var mailInfo = require('../mail_info.json')

const familyMemberController = require('../database/controllers/FamilyMemberController');
const commentController = require('../database/controllers/CommentController');
const PostController = require('../database/controllers/PostController');

const {ContactController} = require('../database/controllers/BlogController');



async function updatePostCache(){
    postsData = await PostController.listAllPosts();
        
        // build all page names replacing 
        postsData.forEach(element => {
            element.path = String(element.title).toLowerCase().replace(/ /g, '-');
        });
}



router.get('/getPositions', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    
    if(req.query)
        if(req.query.id)
        familyMemberController.getFamilyPosition(req.query.id).then(response => {
            //console.log(response)
            res.send(response)
        })

});





router.post('/postComment', function(req, res, next) {
    console.log(req.body)   
    if(req.body)
        commentController.postComment(Object.assign(req.body)).then(response => {
                        
            for(index in response){
                response[index].create_date = formatDateTime(response[index].create_date);
            }
            
            res.redirect('/' + req.body.parent_post)
        })
    else
        res.send('Erro ao postar o comentário') 
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


// 
router.post('/make_contact', function(req,res,next){

    if(req.body){
        if(req.body.name && req.body.email && req.body.message){
            // send mail to admin
            mailer.sendContactMail(JSON.stringify(req.body)).then(response => {
 
            }).catch(error => {

            })
            // Store contact on Database.
            // As our controller is an API controller, it handles the res.send() per se. 
            ContactController.store(req, res, next)
        }
    }
});

   





module.exports = router;
