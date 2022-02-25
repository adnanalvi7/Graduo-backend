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

  let result = await getDbInstance.collection("system_translations").find({}).toArray();

  let duplicateKeys = [];

  result.forEach(item1 => {

    let alreadyExist = false;

    duplicateKeys.forEach(dItem => {
      if (dItem['key'] === item1['key'] && dItem['language'] === item1['language']) {
        alreadyExist = true;
      }
    });


    if (!alreadyExist) {

      result.forEach(item2 => {

        if (item1['_id'] !== item2['_id']) {

          if (item1['key'] === item2['key'] && item1['language'] === item2['language']) {

            duplicateKeys.push(item2);

          }

        }

      });

    }

  });

  console.log('Keys Removed');

  for (const item of duplicateKeys) {

    console.log(item['language'] + ' :: ' + item['key']);

    await getDbInstance.collection("system_translations").deleteOne({ _id: item['_id'] });
  }

  getDbInstance.close();

  return true;


};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
