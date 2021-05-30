var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path');
const PostController = require('../database/controllers/PostController');
const commentController = require('../database/controllers/CommentController');


// gray-matter to read the .md files better
const matter = require('gray-matter');

site = {
  title:"Família Kortkamp",
  description:"Da Alemanha ao Brasil, 200 anos de História"
}



global.postsData =[];

// Load All Blog Posts in Memory
var postList;
(async() => {
    postsData = await PostController.listAllPosts();
})();




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

   

    if(post = postsData.find(item => item.page_name === req.params.article)){

        

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

module.exports = router;
