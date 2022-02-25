'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {

  // let result = db.find()

  const getDbInstance = await db._run("getDbInstance");

  await getDbInstance.collection("system_translations").deleteMany({ key: 'Invoice moment' });
  await getDbInstance.collection("system_translations").deleteMany({ key: 'invoices movements' });
  await getDbInstance.collection("system_translations").deleteMany({ key: 'invoice moment' });

  

  getDbInstance.close();

  return true;


};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
