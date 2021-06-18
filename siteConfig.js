const { ConfigController } = require('./database/controllers/BlogController');

class SiteConfig {
  constructor() {
    this.data = {};
    this.updateConfig();
  }

  async updateConfig() {
    this.data = await ConfigController.getFirstEntry();
  }
}

module.exports = new SiteConfig();
