'use strict';

const HostService = require('./lib/hostService');

(async () => {
  const hostService = new HostService();
  await hostService.init();
  const hosts = await hostService.getHosts('testApp', 'taobao');
  console.log(hosts);
  await hostService.stop();
})();