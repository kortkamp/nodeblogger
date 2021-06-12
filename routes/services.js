var express = require('express');
const { compileClientWithDependenciesTracked } = require('pug');
var router = express.Router();

// undefined in case of not configured Sendgrid account
var mailer; 
try{
    var mailInfo = require('../mail_info.json')
    if(mailInfo)
        mailer = require('../mailer');
}catch{
    console.log('No mailer credentials provided');
}

const PostController = require('../database/controllers/PostController');
const familyMemberController = require('../database/controllers/FamilyMemberController');
const commentController = require('../database/controllers/CommentController');
const InternalPostController = require('../database/controllers/PostController');
const SubscriberController = require('../database/controllers/SubscriberController');

const {ContactController,ConfigController, ArticleController} = require('../database/controllers/BlogController');








router.get('/getPositions', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    
    if(req.query)
        if(req.query.id)
        familyMemberController.getFamilyPosition(req.query.id).then(response => {
            //console.log(response)
            res.send(response)
        })

});



// here we should implement a response or confirmation page
router.get('/unsubscribe', (req,res) => {
    if(req.query && req.query.email){
        SubscriberController.removeSubscriber({email:req.query.email})
        .then(res.send('Sorry about inconvenience'))
    }
})


router.post('/postComment', function(req, res, next) {
    
    if(req.body){

        if(req.body.subscribe === 'on'){
            // subscribe name and email
            SubscriberController.addSubscribers({
                    name:req.body.author,
                    email:req.body.email,
                })
        }

        commentController.postComment(Object.assign(req.body)).then(response => {
                       
            res.redirect('/' + req.body.parent_post)
        })
    }
    else
        res.send('Erro ao postar o comentário') 
});



router.post('/make_contact', function(req,res,next){
    //return ContactController.store(req, res, next)
    
    if(req.body){
        if(req.body.name && req.body.email && req.body.message){
            // send mail to admin
            
            if(mailer && siteConfig.notify_contact){
                mailer.sendContactMail(req.body).then(response => {
    
                }).catch(error => {

                })
            }
            // Store contact on Database.
            // As our controller is an API controller, it handles the res.send() per se. 
            return ContactController.store(req, res, next)
        }
    }
    return res.status(400).send();
});



async function updatePostCache(){
    console.log('inside updateCache')
    try{

        //authors.clear();
        keywords.clear();

        siteConfig = await ConfigController.getFirstEntry();
        postsData = await InternalPostController.listAllPosts();
        
        // build all page names replacing spaces by '-'
        postsData.forEach(element => {

            element.keywords.split(' ').forEach(keyword => {console.log(keyword);keywords.add(keyword)});
            authors.add(element.author);
            
            //console.log(authors)
            //console.log(keywords)


            element.path = String(element.title).toLowerCase().replace(/ /g, '-');
           // console.log(element.path)
        });

    }catch(err){
        throw err;
        //console.log('error on updateCache')
    }
}

router.post('/updateCache', function(req,res,next){
    updatePostCache()
    .then( res.status(204).send())
    .catch(err => {console.log(err);res.status(500).send()})
});

router.post('/publishArticle/:id', function(req,res,next){
    var articleId = req.params.id;

    // notify subscribers
    (async() => {
        article = await PostController.getPostById(articleId)
        if(mailer){
            mailer.notifySubscribers(article).then(response => {
    
            }).catch(error => {
    
            })
        }
    })();
    
    // make the article public
    req.body.public = true;
    
    //console.log('after ArticleController.update(req,res)')
    (async() => {
        await ArticleController.update(req,res)
        await updatePostCache().then().catch(err => console.log(err))
    })();
     
});


router.post('/likeArticle', function(req,res,next){
    console.log(req.body)
    PostController.addLike(req.body.id)
    .then(data =>{
        res.json({'likes':data.likes})
    })

    
});

module.exports = router;
