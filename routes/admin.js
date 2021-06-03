var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const UserController = require('../database/controllers/UserController');



const secret = "1234567890"


function validateToken(req,res,next){
    const token = req.cookies['x-access-token'];
    //if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    if (token){
        jwt.verify(token, secret, function(err, decoded) {
            if(err){ 
                // on error call login page
                res.redirect("/admin/login");
            }                
            else{
                req.userId = decoded.id
                next();
            }
        });
    }else{
        res.redirect("/admin/login");
    }
}



router.get("/", validateToken,(req, res) => {
    return res.send("logado as user " + req.userId) 
});

router.get("/login", (req,res) => {
    console.log('-----------')
    return res.render("adminLogin", {
        error: req.query.error
    });
});


// do login
router.post("/", (req,res,next) => {
    UserController.validateUser({username:req.body.user,password:req.body.password})
    .then( validUser => {
        //console.log(validUser)
        if(validUser){
            const id = validUser.id;
            const token = jwt.sign({ id }, secret, {
                expiresIn: 900
            });
            //req.token = token;
            //res.redirect('/admin');
            return res.send("<script>document.cookie = 'x-access-token=" + token + "'; window.location.href = '/admin'</script>");
        }
        else       
            res.redirect('/admin?error=Incorrect username or password');   
    })  
});



module.exports = router;