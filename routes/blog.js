var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path');

const commentController = require('../database/controllers/CommentController');
const PostController = require('../database/controllers/PostController');


// gray-matter to read the .md files better
const matter = require('gray-matter');

site = {
  title:"Família Kortkamp",
  description:"Da Alemanha ao Brasil, 200 anos de História"
}








router.get("/", (req, res) => {
  //const posts = fs.readdirSync(process.cwd() + '\\blog\\' ).filter(file => file.endsWith('.md'));
  //console.log(posts);
  res.render("blogindex", {
    menu: postsData,
    title: 'Família Kortkamp',
    site:site,
  });
});

router.get("/tree", (req,res) => {
  const file = matter.read(path.join(process.cwd() , 'public','htree.htm'));
  res.render("tree", {
    menu: postsData,
    title: site.title,
    site:site,
    treeBody:file.content
  });
});

router.get("/editor", (req,res) => {  

    PostController.listAllHeaders().then(postHeaderList => {
        //console.log(postList)
    
        res.render("editor", {
            // dataFields must receive all fields of data we want to edit
            postList:postHeaderList,
            dataFields:PostController.getModelFields(),
        });
    
    });
    
  });

router.get("/contact", (req,res) => {
  const file = matter.read(path.join(process.cwd() , 'public' , 'contact.htm'));
  res.render("contact", {
    menu: postsData,
    title: 'Contato',
    site:site,
    contactBody:file.content,
    customStyle:'dddd'
  });
});
  


router.get("/:article", (req, res) => {

 
    var post;

    if(post = postsData.find(item => item.path === req.params.article)){

        // use markdown-it to convert content to HTML
        var md = require("markdown-it")();
        var result = md.render(post.content);
        
        commentController.getComments(req.params.article).then(commentsArray => {       
            res.render("blog", {
                site:site,
                postBody: result,
                menu: postsData,
                title: post.title,
                description: post.description,
                article: req.params.article,
                page_name: req.params.article,
                comments: commentsArray
            });
        })   
    }
});


async function updatePostCache(){
  postsData = await PostController.listAllPosts();
      
      // build all page names replacing 
      postsData.forEach(element => {
          element.path = String(element.title).toLowerCase().replace(/ /g, '-');
      });
}

module.exports = router;
