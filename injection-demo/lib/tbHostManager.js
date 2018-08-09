class TbHostManager {
  async getHost() {
    return this.request();
  }

  async request() {
    return new Promise((resolve) => {
      resolve([
        '192.1.1.2',
        '192.1.1.3',
      ]);
    }, 100);
  }
}

module.exports = TbHostManager;