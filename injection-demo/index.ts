'use strict';

import {ready} from './readyData';
import {HostService} from './lib/hostService';
import {Container} from 'injection';
import {AppService} from './lib/appService';
import {RecordService} from './lib/recordService';
import { HostManagerFactory } from './lib/hostManagerFactory';
import { TbHostManager} from './lib/manager/tbHostManager';
import { AlipayHostManager} from './lib/manager/alipayHostManager';
import { AliyunHostManager} from './lib/manager/aliyunHostManager';

(async () => {
  const container = new Container();
  // 可以绑定函数
  container.bind('db', ready);
  // 可以指定 id
  container.bind('hostServiceTest', HostService);
  // 可以直接绑定类
  container.bind(AppService);
  container.bind(RecordService);
  container.bind(HostManagerFactory);
  container.bind(TbHostManager);
  container.bind(AlipayHostManager);
  container.bind(AliyunHostManager);

  // 真正的调用，通过id获取，也可以通过类名获取
  const hostService: HostService = await container.getAsync<HostService>('hostServiceTest');

  await hostService.init();
  const notifySuccessList = await hostService.notifyOwnerWhenSuccess('testApp', 'alipay');
  console.log(notifySuccessList);
  await hostService.stop();
})();