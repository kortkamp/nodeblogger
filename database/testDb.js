const controller = require('./controllers/CommentController');

//index.js
(async() => {
    
    //var children = await familyMemberController.getChildren(2)
    //console.log(children)
    var children = await controller.getComments('post2')
    //var children = await familyMemberController.hasChildren(0)

    console.log(children)
    
})();

