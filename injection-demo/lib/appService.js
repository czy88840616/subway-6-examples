class AppService {
  constructor(db) {
    this.db = db;
  }

  getOwner(appName, scope) {
    return this.db.all(
      'select owner from app where app_name = ? and scope = ?', 
      appName, 
      scope,
    );
  }
}

module.exports = AppService;