import {HostManager} from '../../interface';
import {provide, inject} from 'injection';

@provide()
export class AliyunHostManager implements HostManager {

  name = 'aliyun';

  @inject()
  db;

  async getHosts(appName) {
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