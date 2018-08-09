class RecordService {
  constructor(db) {
    this.db = db;
  }

  getHostStatus(ip) {
    return this.db.get(
      'select * from record where ip = ?', 
      ip, 
    );
  }
}

module.exports = RecordService;
