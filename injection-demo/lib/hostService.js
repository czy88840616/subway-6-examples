'use strict';

const readyData = require('../readyData');
const TbHostManager = require('./tbHostManager');

class HostService {

  constructor() {
    this.tbHostManager = new TbHostManager();
  }

  async init() {
    this.db = await readyData.ready();
  }

  async getHosts(appName, scope) {

    if(scope === 'taobao') {
      return await this.tbHostManager.getHost();
    }

    return this.db.all(
      'select * from host where app_name = ? and scope = ?', 
      appName, 
      scope);
  }

  async stop() {
    this.db.close();
  }
 
}

module.exports = HostService;