import {TbHostManager} from './manager/tbHostManager';
import {AlipayHostManager} from './manager/alipayHostManager';
import {AliyunHostManager} from './manager/aliyunHostManager';
import { HostManager } from '../interface';
import {provide, inject} from 'injection';

@provide()
export class HostManagerFactory {

  @inject()
  tbHostManager: TbHostManager;
  @inject()
  alipayHostManager: AlipayHostManager;
  @inject()
  aliyunHostManager: AliyunHostManager

  get(scope: string): HostManager {

    if(scope === 'taobao') {
      return this.tbHostManager;
    }

    if(scope === 'alipay') {
      return this.alipayHostManager;
    }

    if(scope === 'aliyun') {
      return this.aliyunHostManager;
    }
  }
}