var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getPositions.php', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  console.log(req.query)
  res.send("working on it");
});





module.exports = router;
