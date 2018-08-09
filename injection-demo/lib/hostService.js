'use strict';

const readyData = require('../readyData');

class HostService {

  constructor() {
  }

  async init() {
    this.db = await readyData.ready();
  }

  async getHosts(appName, scope) {
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