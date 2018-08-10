import {TbHostManager} from './manager/tbHostManager';
import {AlipayHostManager} from './manager/alipayHostManager';
import {AliyunHostManager} from './manager/aliyunHostManager';
import { HostManager } from '../interface';

export class HostManagerFactory {

  db;
  
  constructor(db) {
    this.db = db;
  }

  get(scope: string): HostManager {

    if(scope === 'taobao') {
      return new TbHostManager(this.db);
    }

    if(scope === 'alipay') {
      return new AlipayHostManager(this.db);
    }

    if(scope === 'aliyun') {
      return new AliyunHostManager(this.db);
    }
  }
}