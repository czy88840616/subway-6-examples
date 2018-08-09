'use strict';

const readyData = require('./readyData');
const HostService = require('./lib/hostService');

(async () => {
  const db = await readyData.ready();
  const hostService = new HostService(db);
  await hostService.init();
  const notifySuccessList = await hostService.notifyOwnerWhenSuccess('testApp', 'alipay');
  console.log(notifySuccessList);
  await hostService.stop();
})();