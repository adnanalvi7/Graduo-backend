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

  // const data = [{ name: 'Super Admin', isSuperUser: true }];
  const item = { name: 'Super Admin', isSuperUser: true };

  // for (const item of data) {

  console.log(item);

  let findResult = await getDbInstance.collection("user_roles").find({ name: item['name'] }).toArray();

  console.log(findResult);

  console.log('Total Records: ' + findResult.length);

  if (findResult.length === 0) {

    console.log('Inserting Role: ' + item['name']);
    await getDbInstance.collection("user_roles").insert(item);

  }
  else {

    console.log('Updating Role: ' + item['name']);
    // await getDbInstance.collection("user_roles").update({ name: item['name'] }, { isSuperUser: true }, { upsert: true });

    await getDbInstance.collection("user_roles").update({ "name": item['name'] }, { $set: { "isSuperUser": true } }, { upsert: true });

    // await getDbInstance.collection("users").updateMany({}, { "$unset": { "entity": "" } }, { "upsert": false });

  }

  // }

  getDbInstance.close();

  // throw 'test';

  return true;

};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
