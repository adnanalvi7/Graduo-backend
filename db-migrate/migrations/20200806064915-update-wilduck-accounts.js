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

    let findResult = await getDbInstance.collection("users").find({ wildduckEmail: { $exists: true } });
    if (findResult.length > 0) {

      for(const item of findResult){

        await getDbInstance.collection("users").updateOne({_id:item._id},{ $set: { wildduckEmail: item.wildduckEmail+'graduadosocial.online' }});

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
