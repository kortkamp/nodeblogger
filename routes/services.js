var express = require('express');
const { compileClientWithDependenciesTracked } = require('pug');
var router = express.Router();

var getPosition = require('../getPosition');



router.get('/getPositions', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    //console.log(req.query)
    if(req.query)
        if(req.query.id)
        //res.json(getPosition.getFamilyPosition(req.query.id));
        //console.log(getPosition.getFamilyPosition(req.query.id))
        getPosition.getFamilyPosition(req.query.id).then(response => {
            res.send(response)
        })

});

router.get('/make_contact', function(req,res,next){

  res.send('contact made')
});

   



module.exports = router;
