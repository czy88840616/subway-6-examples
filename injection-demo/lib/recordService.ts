import {provide, inject} from 'injection';


@provide()
export class RecordService {

  @inject()
  db;

  getHostStatus(ip) {
    return this.db.get(
      'select * from record where ip = ?', 
      ip, 
    );
  }
}
