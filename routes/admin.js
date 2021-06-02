var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const UserController = require('../database/controllers/UserController');



const secret = "1234567890"

router.get("/", (req, res) => {
  
    console.log(req.error);


    res.render("adminLogin", {
        error: req.query.error
    });
});


router.post("/", (req,res,next) => {
    console.log(req.body)
    UserController.validateUser({username:req.body.user,password:req.body.password})
    .then( validUser => {
        console.log(validUser)
        if(validUser){

            const id = validUser.id;
            const token = jwt.sign({ id }, secret, {
                expiresIn: 300 // expires in 5min
            });
            return res.json({ auth: true, token: token });
        }
        

        
        res.redirect('/admin?error=Incorrect username or password');

        
    })
        
    
});



module.exports = router;