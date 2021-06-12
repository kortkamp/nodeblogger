const PostController = require("./controllers/PostController");

var fs = require('fs')
var path = require('path');

const matter = require('gray-matter');

(async() => {
    // Create necessary tables
  
    const file = matter.read(path.join(process.cwd() , 'docs' , 'getting-started.md'));
   
    var starting = {
        
        "title": "Getting Started",
        "description": "Start Using Nodeblogger",
        "author": "Marcelo Kortkamp",
        "keywords": "starting setup nodeblogger",
        "allow_commentary": true,
        "public": true,
        "main_menu": true,
        "type": 0,
        "status": 0,
        "views": 2,
        "likes": 1,
        "content": file.content,
    
      }

      var result = await PostController.postArticle(starting);
      console.log(result);

    process.exit(0);
})();



