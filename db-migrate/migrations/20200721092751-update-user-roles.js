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

  await getDbInstance.collection("user_roles").updateOne({name: 'Admin'},  {$set: {name: {en:'Admin',es:'Administrador',ca:'Administrador'}}}, { "upsert": false });
  await getDbInstance.collection("user_roles").updateOne({name: 'User'},  {$set: {name: {en:'User',es:'Usuario',ca:'Usuari'}}}, { "upsert": false });
  await getDbInstance.collection("user_roles").updateOne({name: 'Power User'},  {$set: {name: {en:'Power User',es:'Usuario de poder',ca:'Usuari Energètic'}}}, { "upsert": false });

  getDbInstance.close();

  return true;

};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
