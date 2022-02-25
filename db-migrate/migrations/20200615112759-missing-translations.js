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
    { language: language, key: "Lunes", value: "Lunes", status: status },
    { language: language, key: "invoices", value: "Invoices", status: status },
    { language: language, key: "proforma", value: "Proforma", status: status },
    { language: language, key: "concepts", value: "Concepts", status: status },
    { language: language, key: "taxable basis", value: "Taxable Basis", status: status },
    { language: language, key: "applied discount informative", value: "Applied discount informative", status: status },
    { language: language, key: "partially paid", value: "Partially Paid", status: status },
    { language: language, key: "create new", value: "Create New", status: status },
    { language: language, key: "unit price", value: "Unit Price", status: status },
    { language: language, key: "discount %", value: "Discount %", status: status },
    { language: language, key: "irpf %", value: "IRPF %", status: status },
    { language: language, key: "vat %", value: "VAT %", status: status },
    { language: language, key: "add more", value: "Add More", status: status },
    { language: language, key: "transactions", value: "Transactions", status: status },
    { language: language, key: "operation", value: "Operation", status: status },
    { language: language, key: "transaction id", value: "Transaction Id", status: status },
    { language: language, key: "service id", value: "Service Id", status: status },
    { language: language, key: "users", value: "Users", status: status },
    { language: language, key: "Type name to search", value: "Type name to search", status: status },
    { language: language, key: "consulting firms", value: "Consulting Firms", status: status },
    { language: language, key: "expense account", value: "Expense Account", status: status },
    { language: language, key: "consulting firm", value: "Consulting Firm", status: status },
    // { language: language, key: "type to search ( key, description, default quantity)", value: "type to search ( key, description, default quantity)", status: status },
    { language: language, key: "authorization role", value: "Authorization Role", status: status },
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
