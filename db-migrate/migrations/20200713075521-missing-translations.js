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
    { language: language, key: "create new folder", value: "Create New Folder", status: status },
    { language: language, key: "file manager", value: "File Manager", status: status },
    { language: language, key: "my files", value: "My Files", status: status },
    { language: language, key: "sharred with me", value: "Sharred With Me", status: status },
    { language: language, key: "recent", value: "Recent", status: status },
    { language: language, key: "offline", value: "Offline", status: status },
    { language: language, key: "share", value: "Share", status: status },
    { language: language, key: "open", value: "Open", status: status },
    { language: language, key: "move", value: "Move", status: status },
    { language: language, key: "download", value: "Download", status: status },
    { language: language, key: "more", value: "More", status: status },
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
