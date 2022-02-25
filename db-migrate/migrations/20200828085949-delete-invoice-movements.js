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

  const getDbInstance = await db._run("getDbInstance");

 await getDbInstance.collection("invoice_movements").deleteMany( { _id: { $exists: true}});


  getDbInstance.close();

  return true;

};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
