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

  const language = 'en';
  const status = 'completed';

  const translationsData = [
    { language: language, key: "password updated successfully", value: "Password updated successfully", status: status },
    { language: language, key: "updated", value: "updated", status: status },
    { language: language, key: "field is required", value: "Field is required", status: status },
    { language: language, key: "google maps", value: "Google maps", status: status },

  ];

  for (const item of translationsData) {

    let findResult = await getDbInstance.collection("system_translations").find({ language: language, key: item['key'] }).toArray();

    if (findResult.length === 0) {

      console.log('Inserting: ' + item['key']);
      await getDbInstance.collection("system_translations").insert(item);

    }

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
