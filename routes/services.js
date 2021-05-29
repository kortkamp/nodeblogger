var express = require('express');
const { compileClientWithDependenciesTracked } = require('pug');
var router = express.Router();

var mailer = require('../mailer');

var mailInfo = require('../mail_info.json')

const familyMemberController = require('../database/controllers/FamilyMemberController');
const commentController = require('../database/controllers/CommentController');





router.get('/getPositions', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    
    if(req.query)
        if(req.query.id)
        familyMemberController.getFamilyPosition(req.query.id).then(response => {
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
            commentController.getComments(req.query.post).then(response => {
                //console.log(response[0].create_date)
                
                for(index in response){
                    response[index].create_date = formatDateTime(response[index].createdAt);
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
