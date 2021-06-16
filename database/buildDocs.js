const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const matter = require('gray-matter');
const PostController = require('./controllers/PostController');

(async () => {
  // Create necessary tables

  let file = matter.read(path.join(process.cwd(), 'docs', 'getting-started.md'));

  let header = {
    title: 'Getting Started',
    description: 'Start Using Nodeblogger',
    author: 'Marcelo Kortkamp',
    keywords: 'starting setup nodeblogger',
    allow_commentary: true,
    public: true,
    main_menu: true,
    type: 0,
    status: 0,
    views: 0,
    likes: 0,
    content: file.content,
  };

  let result = await PostController.postArticle(header);

  console.log(result);

  file = matter.read(path.join(process.cwd(), 'docs', 'development.md'));

  header = {
    title: 'Development',
    description: 'Start Using Nodeblogger',
    author: 'Marcelo Kortkamp',
    keywords: 'starting setup nodeblogger',
    allow_commentary: true,
    public: true,
    main_menu: true,
    type: 0,
    status: 0,
    views: 0,
    likes: 0,
    content: file.content,
  };

  result = await PostController.postArticle(header);

  console.log(result);

  process.exit(0);
})();
