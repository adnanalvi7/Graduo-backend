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
    { language: language, key: "detail view", value: "Detail View", status: status },
    { language: language, key: "payment info", value: "Payment Info", status: status },
    { language: language, key: "invoice payment", value: "Invoice Payment", status: status },
    { language: language, key: "add payment", value: "Add Payment", status: status },
    { language: language, key: "outstanding percentage", value: "Outstanding percentage", status: status },
    { language: language, key: "days overdue", value: "Days Overdue", status: status },
    { language: language, key: "history", value: "History", status: status },
    { language: language, key: "version", value: "Version", status: status },
    { language: language, key: "created by", value: "Created By", status: status },
    { language: language, key: "updated by", value: "Updated By", status: status },
    { language: language, key: "key required", value: "Key Required", status: status },
    { language: language, key: "value required", value: "Value Required", status: status },
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
