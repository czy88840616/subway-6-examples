import {TbHostManager} from './manager/tbHostManager';
import {AppService} from './appService';
import {RecordService} from './recordService';
import { HostManagerFactory } from './hostManagerFactory';

export class HostService {

  db;
  appService;
  recordService;
  hostManager;
  hostManagerFactory;

  constructor(db) {
    this.db = db;
    this.hostManagerFactory = new HostManagerFactory(db);
    this.appService = new AppService(db);
    this.recordService = new RecordService(db);
    this.hostManager = new TbHostManager(db);
  }

  async init() {
    
  }

  async getHosts(appName, scope): Promise<Array<string>> {
    return this.hostManagerFactory.get(scope).getHosts(appName);
  }

  async notifyOwnerWhenSuccess(appName, scope) {
    
    let hosts = await this.getHosts(appName, scope);

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