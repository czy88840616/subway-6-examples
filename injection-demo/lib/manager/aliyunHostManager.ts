import {HostManager} from '../../interface';

export class AliyunHostManager implements HostManager {

  name = 'aliyun';

  db;

  constructor(db) {
    this.db = db;
  }

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