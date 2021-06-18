const InternalPostController = require('./database/controllers/PostController');

// articlesCache gonna hold all properties of models/PostModels plus a path propoertie.
class SiteCache {
  constructor() {
    this.articlesCache = [];
    this.authorList = [];
    this.keywordList = [];
    this.updateSiteCache();
  }

  async updateSiteCache() {
    this.articlesCache = await InternalPostController.listAllPosts();
    this.makePath();// not good
    this.authorList = this.getAuthors();
    this.keywordList = this.getKeywords();
  }

  makePath() {
    this.articlesCache.forEach((element) => {
      // build article path replacing spaces by '-'
      element.path = String(element.title).toLowerCase().replace(/ /g, '-');
      console.log(element.path);
    });
  }

  // return a list of all keywords on articles.
  getKeywords() {
    const keywordSet = new Set();

    this.articlesCache.forEach((element) => {
      element.keywords.split(' ').forEach((keyword) => {
        keywordSet.add(keyword);
      });

      // console.log(element.path)
    });
    return Array.from(keywordSet);
  }

  // return a list of authors.
  getAuthors() {
    const authorSet = new Set();
    this.articlesCache.forEach((element) => {
      authorSet.add(element.author);
    });
    return Array.from(authorSet);
  }

  getArticlesCache() {
    return this.articlesCache;
  }
}

// returning new instance makes our module a Singleton, as Node caches the instance
// and aways use it when calling this module again.
module.exports = new SiteCache();