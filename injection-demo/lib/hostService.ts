import {AppService} from './appService';
import {RecordService} from './recordService';
import { HostManagerFactory } from './hostManagerFactory';
import {provide, inject, init} from 'injection';

@provide()
export class HostService {

  @inject()
  db;
  @inject()
  appService: AppService;
  @inject()
  recordService: RecordService;
  @inject()
  hostManagerFactory: HostManagerFactory;

  @init()
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