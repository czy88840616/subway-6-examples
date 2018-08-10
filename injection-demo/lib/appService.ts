import {provide, inject} from 'injection';

@provide()
export class AppService {

  @inject()
  db;

  getOwner(appName, scope) {
    return this.db.all(
      'select owner from app where app_name = ? and scope = ?', 
      appName, 
      scope,
    );
  }
}