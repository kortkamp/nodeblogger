var express = require('express');
var router = express.Router();

var toolsRouter = require('./tools');
const jwt = require('jsonwebtoken');
const UserController = require('../database/controllers/InternalUserController');


const auth = require('../auth_info');


function validateToken(req,res,next){
    const token = req.cookies['x-access-token'];
    
    if (token){
        jwt.verify(token, auth.secret, function(err, decoded) {
            
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
    
    if(req.body.user ){
        UserController.validateUser({username:req.body.user,password:req.body.password})
        .then( validUser => {
            //console.log(validUser)
            if(validUser){
                const id = validUser.id;
                const token = jwt.sign({ id }, auth.secret, {
                    expiresIn: auth.tokenExpireTime
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
        res.redirect('/admin?error=Incorrect username or password'); 
    }
});


// return a new fresh token
router.post("/refreshToken", (req,res,next) => {
    const token = req.body.token;
    if (token){
        jwt.verify(token, auth.secret, function(err, decoded) {
            //console.log(decoded)
            if(err){ 
                // on error call login page
                return res.json({'error':err})
            }                
            else{
                var id = decoded.id
                //console.log('new token id:' + id)
                const newToken = jwt.sign({ id }, auth.secret, {
                    expiresIn: auth.tokenExpireTime
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
