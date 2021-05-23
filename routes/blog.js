var express = require('express');
var router = express.Router();
var fs = require('fs')

// gray-matter to read the .md files better
const matter = require('gray-matter');



var posts = fs.readdirSync(process.cwd() + '\\blog\\' ).filter(file => file.endsWith('.md'));
var postsData =[];
for(post of posts){
  let file = matter.read(process.cwd() + '\\blog\\' + post);
  postsData.push(
    {
      link:post.split('.')[0],
      title:file.data.title
    }
  )
}

console.log(postsData)


router.get("/", (req, res) => {
  //const posts = fs.readdirSync(process.cwd() + '\\blog\\' ).filter(file => file.endsWith('.md'));
  console.log(posts);
  res.render("blogindex", {
    posts: posts
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
    postBody: result,
    menu: postsData,
    title: file.data.title,
    description: file.data.description,
    image: file.data.image
  });
});

module.exports = router;
