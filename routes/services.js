var express = require('express');
const { compileClientWithDependenciesTracked } = require('pug');
var router = express.Router();

var getPosition = require('../getPosition');

var mailer = require('../mailer');

var mailInfo = require('../mail_info.json')

var db = require ('../db')



router.get('/getPositions', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    
    if(req.query)
        if(req.query.id)
        //res.json(getPosition.getFamilyPosition(req.query.id));
        //console.log(getPosition.getFamilyPosition(req.query.id))
        getPosition.getFamilyPosition(req.query.id).then(response => {
            //console.log(response)
            res.send(response)
        })

});

router.get('/getComments', function(req, res, next) {
    //res.render('index', { title: 'Express' });
      
        if(req.query)
            if(req.query.post)
            //res.json(getPosition.getFamilyPosition(req.query.id));
            //console.log(getPosition.getFamilyPosition(req.query.id))
            db.getComments(req.query.post).then(response => {
                //console.log(response)
                //res.send(response)
                res.render("comments", {

                    comments: response
                });
            })
        else
            res.send() 
});

router.post('/postComment', function(req, res, next) {
    console.log(req.body)
    res.send('....') 
});

router.post('/make_contact', function(req,res,next){
    
    console.log(req.body)
    
    mailer.sendContactMail(JSON.stringify(req.body)).then(response => {
        res.render("contactReturn", {
            
            title: 'Obrigado',
            message: 'Sua mensagem foi enviada com sucesso'
        });
    }).catch(error => {
        res.render("contactReturn", {
            
            title: 'Ocorreu um Erro!',
            message: 'Ocorreu um erro no servidor, favor enviar seu contato para o e-mail ' + mailInfo.adminEmail
        });
    })
});

   





module.exports = router;
