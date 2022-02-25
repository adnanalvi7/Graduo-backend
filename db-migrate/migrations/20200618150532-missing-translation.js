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
    { language: language, key: "title", value: "Title", status: status },
    { language: language, key: "subject", value: "Subject", status: status },
    { language: language, key: "type", value: "Type", status: status },
    { language: language, key: "invoice remainder email", value: "Invoice Remainder Email", status: status },
    { language: language, key: "invoice email with pdf", value: "Invoice Email With Pdf", status: status },
    { language: language, key: "send reminder email", value: "Send Remainder Email", status: status },
    { language: language, key: "email has been sent successfully", value: "Email Has Been Sent Successfully", status: status },
    { language: language, key: "message", value: "Message", status: status },
    { language: language, key: "error", value: "Error", status: status },
    { language: language, key: "problem sending mail", value: "Problem Sending Mail", status: status },

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
