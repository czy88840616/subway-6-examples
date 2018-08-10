'use strict';

import sqlite = require('sqlite');

export async function ready (context) {
  let db = await sqlite.open(':memory:');
  // 主机记录
  await db.run('CREATE TABLE host(app_name text, ip text, scope text)');
  await db.run('insert into host values ("testApp", "192.168.1.1", "alipay")');
  await db.run('insert into host values ("testApp", "192.168.1.2", "taobao")');
  await db.run('insert into host values ("testApp", "192.168.1.3", "aliyun")');
  await db.run('insert into host values ("testApp", "192.168.1.4", "alipay")');

  // 发布记录
  await db.run('CREATE TABLE record(ip text, status text)');
  await db.run('insert into record values ("192.168.1.1", "fail")');
  await db.run('insert into record values ("192.168.1.4", "success")');

  // 应用表
  await db.run('CREATE TABLE app(app_name text, scope text, owner text)');
  await db.run('insert into app values ("testApp", "alipay", "zhangting")');
  return db;
}
