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

  // Rename series field to seriesId in invoices
  const getDbInstance = await db._run("getDbInstance");

  await getDbInstance.collection("invoices").updateMany({}, { $rename: { 'series': 'seriesId' } });

  // Update all current invoices series.
  let seriesResult = await getDbInstance.collection("invoice_series").find().sort({ series: 1 }).toArray();

  if (seriesResult.length) {

    let seriesId = seriesResult[0]['_id'];

    await getDbInstance.collection("invoices").updateMany({}, { $set: { 'seriesId': seriesId } });

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
