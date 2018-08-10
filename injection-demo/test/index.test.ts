import {ready} from '../readyData';
import {HostService} from '../lib/hostService';
import {Container} from 'injection';
import {AppService} from '../lib/appService';
import {RecordService} from '../lib/recordService';
import { HostManagerFactory } from '../lib/hostManagerFactory';
import { TbHostManager} from '../lib/manager/tbHostManager';
import { AlipayHostManager} from '../lib/manager/alipayHostManager';
import { AliyunHostManager} from '../lib/manager/aliyunHostManager';

import assert = require('assert');

describe('load ts file', () => {
  const container = new Container();

  before(async () => {
    // 可以绑定函数
    container.bind('db', ready);
    // 可以直接绑定类
    container.bind(AppService);
    container.bind(RecordService);
    container.bind(HostManagerFactory);
    container.bind(TbHostManager);
    container.bind(AlipayHostManager);
    container.bind(AliyunHostManager);
  
  });

  it('should set manager by yourserlf', async () => {
    const hostService = new HostService();

    hostService.db = await container.getAsync('db');
    hostService.appService = await container.getAsync<AppService>(AppService);
    hostService.hostManagerFactory = await container.getAsync<HostManagerFactory>(HostManagerFactory);
    hostService.recordService = await container.getAsync<RecordService>(RecordService);
    
    await hostService.init();
    const notifySuccessList = await hostService.notifyOwnerWhenSuccess('testApp', 'alipay');
    assert(notifySuccessList[0], 'zhangting@taobao.com');
    await hostService.stop();
  });

  it('should inherit and overwrite method', async () => {

    class MockHostService extends HostService {
      async notifyOwnerWhenSuccess(appName, scope) {
        return ['gw@taobao.com'];
      }
    }

    const hostService = new MockHostService();
    hostService.db = await container.getAsync('db');
    await hostService.init();
    const notifySuccessList = await hostService.notifyOwnerWhenSuccess('testApp', 'alipay');
    assert(notifySuccessList[0], 'zhangting@taobao.com');
    await hostService.stop();
  });
});
