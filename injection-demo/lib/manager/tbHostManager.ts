import {HostManager} from '../../interface';
import {provide, inject} from 'injection';

@provide()
export class TbHostManager implements HostManager {

  name = 'taobao';
  
  @inject()
  db;

  async getHosts(appName): Promise<Array<string>> {
    return this.request();
  }

  async getHostsByStatus(status) {
    return this.request();
  }

  async request() {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve([
          '192.1.1.2',
          '192.1.1.3',
        ]);
      }, 100);
    });
  }
}