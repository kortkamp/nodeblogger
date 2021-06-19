/*
*  Cache class gonna handle all requisitions to data from articles,
*  it should return or update both articles cache or articles summary.
*/
const InternalPostController = require('../database/controllers/PostController');

class SiteCache {
  constructor() {
    // how many articles to show in lastArticles list.
    this.numberOfLastArticles = 5;
    // articlesCache gonna hold all properties of models/PostModels plus a path propoertie.
    this.articlesCache = [];
    this.articlesList = [];
    this.authorList = [];
    this.keywordList = [];
    this.lastArticlesList = [];

    this.updateSiteCache();
  }

  async updateSiteCache() {
    this.articlesCache = await InternalPostController.listAllPosts();
    this.makePath();// not good
    this.authorList = this.listAuthors();
    this.keywordList = this.listKeywords();
    this.articlesList = this.listArticles();
    this.lastArticlesList = this.articlesCache.slice(-this.numberOfLastArticles).reverse();
  }

  makePath() {
    this.articlesCache.forEach((element) => {
      // build article path replacing spaces by '-'
      element.path = String(element.title).toLowerCase().replace(/ /g, '-');
    });
  }

  // return a list of all keywords on articles.
  listKeywords() {
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
  listAuthors() {
    const authorSet = new Set();
    this.articlesCache.forEach((element) => {
      authorSet.add(element.author);
    });
    return Array.from(authorSet);
  }

  listArticles() {
    return this.articlesCache;
  }

  getArticlesCache() {
    return this.articlesCache;
  }

  // all list must be changed to hold just necessary data.
  getSummary() {
    return {
      articlesList: this.articlesList,
      authorList: this.authorList,
      keywordList: this.keywordList,
      lastArticlesList: this.lastArticlesList,
    };
  }
}

// returning new instance makes our module a Singleton, as Node caches the instance
// and aways use it when calling this module again.
module.exports = new SiteCache();
