'use strict';

const sqlite = require('sqlite');

async function ready () {
  let db = await sqlite.open(':memory:');
  await db.run('CREATE TABLE host(app_name text, ip text)');
  await db.run('insert into host values ("testApp", "192.168.1.1")');
  await db.run('insert into host values ("testApp", "192.168.1.2")');
  await db.run('insert into host values ("testApp", "192.168.1.3")');
  return db;
}

exports.ready = ready;