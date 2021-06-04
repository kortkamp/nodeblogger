var express = require('express');
var router = express.Router();

var toolsRouter = require('./tools');
const jwt = require('jsonwebtoken');
const UserController = require('../database/controllers/UserController2');


const tokenExpireTime = 20;

const secret = "roses are red violets are blue, weak secrets are for noob"


function validateToken(req,res,next){
    const token = req.cookies['x-access-token'];
    console.log(token)
    //if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    if (token){
        jwt.verify(token, secret, function(err, decoded) {
            //console.log(decoded)
            if(err){ 
                // on error call login page
                console.log(token)
                console.log(err)
                return res.render("login", {
                    error: req.query.error
                });
            }                
            else{
                req.userId = decoded.id
                //console.log(decoded)
                //console.log("login by:" + decoded.id)
                next();
            }
        });
    }else{
        return res.render("login", {
            error: req.query.error
        });
    }
}


router.get("/login", (req,res) => {
    //console.log(req.cookies)
    return res.render("login", {
        error: req.query.error
    });
});


// do login
router.post("/", (req,res,next) => {
    //console.log(req.body)
    if(req.body.user && req.body.password){
        UserController.validateUser({username:req.body.user,password:req.body.password})
        .then( validUser => {
            //console.log(validUser)
            if(validUser){
                const id = validUser.id;
                const token = jwt.sign({ id }, secret, {
                    expiresIn: tokenExpireTime
                });
                //console.log('login generating token')
                //console.log(token)
                
                res.setHeader("Set-Cookie","x-access-token="+token,"Max-Age=20");
                res.send("<script>window.location.href = '/admin'</script>");
            }
            else       
                res.redirect('/admin?error=Incorrect username or password');   
        })  
    }else{
        res.send('form error')
    }
});


// return a new fresh token
router.post("/refreshToken", (req,res,next) => {

    const token = req.body.token;
    
    if (token){
        jwt.verify(token, secret, function(err, decoded) {
            //console.log(decoded)
            if(err){ 
                // on error call login page
                return res.json({'error':err})
            }                
            else{
                var id = decoded.id
                //console.log('new token id:' + id)
                const newToken = jwt.sign({ id }, secret, {
                    expiresIn: tokenExpireTime
                });

                return res.json({'token':newToken});
               
            }
        });
    }else{
        return res.json({'error':'no token provided'})
    } 
});


router.use('/', validateToken,toolsRouter);


module.exports = router;
