'use strict';

import readyData = require('./readyData');
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
  const db = await readyData.ready();
  container.registerObject('db', db);

  container.bind(HostService);
  container.bind(AppService);
  container.bind(RecordService);
  container.bind(HostManagerFactory);
  container.bind(TbHostManager);
  container.bind(AlipayHostManager);
  container.bind(AliyunHostManager);

  const hostService: HostService = await container.getAsync<HostService>(HostService);

  await hostService.init();
  const notifySuccessList = await hostService.notifyOwnerWhenSuccess('testApp', 'alipay');
  console.log(notifySuccessList);
  await hostService.stop();
})();