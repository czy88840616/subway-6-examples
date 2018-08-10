'use strict';

import readyData = require('./readyData');
import {HostService} from './lib/hostService';

(async () => {
  const db = await readyData.ready();
  const hostService = new HostService(db);
  await hostService.init();
  const notifySuccessList = await hostService.notifyOwnerWhenSuccess('testApp', 'alipay');
  console.log(notifySuccessList);
  await hostService.stop();
})();