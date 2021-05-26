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


function formatDateTime(dateTime){
    let date = new Date(dateTime)
    let day =  date.getDate(dateTime)
    let monthIndex = date.getMonth(dateTime)
        let month = ['Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro'][monthIndex]
    let year = date.getFullYear(dateTime)

    let hours = date.getHours(dateTime)
    let minutes =  date.getMinutes(dateTime)

    formatedDate = day + " de " + month + " de " + year + " " + hours + ":" + String(minutes).padStart(2, '0') ;

    return formatedDate;
}

router.get('/getComments', function(req, res, next) {
        if(req.query)
            if(req.query.post)
            db.getComments(req.query.post).then(response => {
                //console.log(response[0].create_date)
                
                for(index in response){
                    response[index].create_date = formatDateTime(response[index].create_date);
                }
                res.render("comments", {
                    comments: response
                });
            })
        else
            res.send() 
});

router.post('/postComment', function(req, res, next) {
    console.log(req.body)

    //storeComment(parent_post,parent_comment,author,mail,text)
    /*
    storeComment(body.parent_post,0,body.author,body.email,body.comment)
    { body
        parent_post: 'post1',
        comment: 'asd',
        author: 'Marcelo T Campos',
        email: 'marcelusmedius@gmail.com',
        submit: 'Publicar comentário'
    }
    */
    if(req.body)
        if(true)
            db.storeComment(req.body.parent_post,0,req.body.author,req.body.email,req.body.comment).then(response => {
                //console.log(response[0].create_date)
                
                for(index in response){
                    response[index].create_date = formatDateTime(response[index].create_date);
                }
                //res.send("será q postou o coment ??");
                res.redirect('/' + req.body.parent_post)
            })
        else
            res.send()  
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
