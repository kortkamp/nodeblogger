var express = require('express');
var router = express.Router();
var fs = require('fs')

// gray-matter to read the .md files better
const matter = require('gray-matter');

site = {
  title:"Família Kortkamp",
  description:"Da Alemanha ao Brasil, 200 anos de História"
}


// must be updated time to time when posting is implented
var posts = fs.readdirSync(process.cwd() + '\\blog\\' ).filter(file => file.endsWith('.md'));
global.postsData =[];
for(post of posts){
  let file = matter.read(process.cwd() + '\\blog\\' + post);
  postsData.push(
    {
      link:post.split('.')[0],
      title:file.data.title
    }
  )
}

//console.log(postsData)


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

  const file = matter.read(process.cwd() + '\\public\\htree.htm');

  res.render("tree", {
    menu: postsData,
    title: site.title,
    site:site,
    treeBody:file.content
  });
});

router.get("/contact", (req,res) => {

  const file = matter.read(process.cwd() + '\\public\\contact.htm');

  res.render("contact", {
    menu: postsData,
    title: 'Contato',
    site:site,
    contactBody:file.content,
    customStyle:'dddd'
  });
});
  


router.get("/:article", (req, res) => {

  // read the markdown file
  const file = matter.read(process.cwd() + '\\blog\\' + req.params.article + '.md');

  // use markdown-it to convert content to HTML
  var md = require("markdown-it")();
  let content = file.content;
  var result = md.render(content);

  //res.render('index', { title: 'Express' });
  //console.log(result)
  res.render("blog", {
    site:site,
    postBody: result,
    menu: postsData,
    title: file.data.title,
    description: file.data.description,
    image: file.data.image,
    article: req.params.article
    
  });
});

module.exports = router;
