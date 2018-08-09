'use strict';

const TbHostManager = require('./tbHostManager');
const AppService = require('./appService');
const RecordService = require('./recordService');

class HostService {

  constructor(db) {
    this.db = db;
    this.appService = new AppService(db);
    this.recordService = new RecordService(db);
    this.tbHostManager = new TbHostManager();
  }

  async init() {
    
  }

  async getHosts(appName, scope) {

    if(scope === 'taobao') {
      return await this.tbHostManager.getHosts();
    }

    const results = await this.db.all(
      'select * from host where app_name = ? and scope = ?', 
      appName, 
      scope,
    );
    
    let hosts = [];
    for(let re of results) {
      hosts.push(re.ip);
    }
    return hosts;
  }

  async notifyOwnerWhenSuccess(appName, scope) {
    
    let hosts = await this.getHosts(appName, scope, 'success');

    let notifySuccessList = [];
    for(let host of hosts) {
      let re = await this.recordService.getHostStatus(host);
      if(re.status === 'success') {
        const appData = await this.appService.getOwner(appName, scope);
        let notifyResult = await this.notify(appData[0].owner);
        if(notifyResult) {
          notifySuccessList.push(appData[0].owner);
        }
      }
    }
    return notifySuccessList;
  }

  async notify(owner) {
    // mock
    return true;
  }

  async stop() {
    this.db.close();
  }
 
}

module.exports = HostService;