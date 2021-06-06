var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path');

const commentController = require('../database/controllers/CommentController');
const PostController = require('../database/controllers/PostController');

const utils = require('../utils');


// gray-matter to read the .md files better
const matter = require('gray-matter');

site = {
  title:"Família Kortkamp",
  description:"Da Alemanha ao Brasil, 200 anos de História"
}



router.get("/", (req, res) => {
  
  res.render("blogindex", {
    menu: postsData,
    title: siteConfig.site_title,
    site:siteConfig,
  });
});

router.get("/tree", (req,res) => {
  const file = matter.read(path.join(process.cwd() , 'public','htree.htm'));
  res.render("tree", {
    menu: postsData,
    title: site.title,
    site:siteConfig,
    treeBody:file.content
  });
});


router.get("/contact", (req,res) => {
  //const file = matter.read(path.join(process.cwd() , 'public' , 'contact.htm'));
  res.render("contact", {
    menu: postsData,
    title: 'Contato',
    site:siteConfig,

    adminEmail:"familiakortkamp@gmail.com"
    
  });
});
  

router.get("/:article", (req, res, next) => {
    var post;

    //search  article in cached articles list
    if(post = postsData.find(item => item.path === req.params.article)){

        var md = require("markdown-it")();
        var result = md.render(post.content);
        
        commentController.getComments(req.params.article).then(commentsArray => {    

            for(index in commentsArray){
                commentsArray[index].create_date = utils.formatDateTime(commentsArray[index].createdAt)
            }
               
            res.render("blog", {
                site:siteConfig,
                postBody: result,
                menu: postsData,
                title: post.title,
                description: post.description,
                article: req.params.article,
                page_name: req.params.article,
                comments: commentsArray
            });
        })   
    }else
      next();
});


module.exports = router;
