const express = require('express');

const router = express.Router();

// undefined in case of not configured Sendgrid account
let mailer;
try {
  const mailInfo = require('../mail_info.json');
  if (mailInfo) { mailer = require('../services/mailer'); }
} catch {
  console.log('No mailer credentials provided');
}

const PostController = require('../database/controllers/PostController');
const familyMemberController = require('../database/controllers/FamilyMemberController');
const commentController = require('../database/controllers/CommentController');
const SubscriberController = require('../database/controllers/SubscriberController');

const { ContactController, ConfigController, ArticleController } = require('../database/controllers/BlogController');

const siteCache = require('../services/cache');

router.get('/getPositions', (req, res, next) => {
  // res.render('index', { title: 'Express' });

  if (req.query) {
    if (req.query.id) {
      familyMemberController.getFamilyPosition(req.query.id).then((response) => {
      // console.log(response)
        res.send(response);
      });
    }
  }
});

// here we should implement a response or confirmation page
router.get('/unsubscribe', (req, res) => {
  if (req.query && req.query.email) {
    SubscriberController.removeSubscriber({ email: req.query.email })
      .then(res.send('Sorry about inconvenience'));
  }
});

router.post('/postComment', (req, res, next) => {
  if (req.body) {
    if (req.body.subscribe === 'on') {
      // subscribe name and email
      SubscriberController.addSubscribers({
        name: req.body.author,
        email: req.body.email,
      });
    }

    commentController.postComment(Object.assign(req.body)).then((response) => {
      res.redirect(`/${req.body.parent_post}`);
    });
  } else { res.send('Erro ao postar o comentário'); }
});

router.post('/make_contact', (req, res, next) => {
  // return ContactController.store(req, res, next)

  if (req.body) {
    if (req.body.name && req.body.email && req.body.message) {
      // send mail to admin

      if (mailer && siteConfig.notify_contact) {
        mailer.sendContactMail(req.body).then((response) => {

        }).catch((error) => {

        });
      }
      // Store contact on Database.
      // As our controller is an API controller, it handles the res.send() per se.
      return ContactController.store(req, res, next);
    }
  }
  return res.status(400).send();
});

async function updatePostCache() {
  siteCache.updateSiteCache();

  siteConfig = await ConfigController.getFirstEntry();
}

router.post('/updateCache', (req, res, next) => {
  updatePostCache()
    .then(res.status(204).send())
    .catch((err) => { console.log(err); res.status(500).send(); });
});

router.post('/publishArticle/:id', (req, res, next) => {
  const articleId = req.params.id;

  // notify subscribers
  (async () => {
    const article = await PostController.getPostById(articleId);
    if (mailer) {
      mailer.notifySubscribers(article).then((response) => {

      }).catch((error) => {

      });
    }
  })();

  // make the article public
  req.body.public = true;

  (async () => {
    await ArticleController.update(req, res);
    await updatePostCache().then().catch((err) => console.log(err));
  })();
});

router.post('/likeArticle', (req, res, next) => {
  PostController.addLike(req.body.id)
    .then((data) => {
      res.json({ likes: data.likes });
    });
});

module.exports = router;
