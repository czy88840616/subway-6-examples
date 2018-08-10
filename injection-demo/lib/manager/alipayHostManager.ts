import {HostManager} from '../../interface';

export class AlipayHostManager implements HostManager {

  name = 'alipay';
  db;

  constructor(db) {
    this.db = db;
  }

  async getHosts(appName) {
    const results = await this.db.all(
      'select * from host where app_name = ? and scope = ?', 
      appName, 
      this.name,
    );
    
    const hosts = [];
    for(let re of results) {
      hosts.push(re.ip);
    }
    return hosts;
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