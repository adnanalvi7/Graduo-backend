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

    { language: language, key: "invalid email or password", value: "Invalid Email Or Password", status: status },
    { language: language, key: "user already exists with this email", value: "User Already Exists With This Email", status: status },
    { language: language, key: "password reset token is invalid or has expired", value: "Password Reset Token Is Invalid Or Has Expired", status: status },
    { language: language, key: "registration failed", value: "Registration Failed", status: status },
    { language: language, key: "user not found with this email", value: "User Not Found With This Email", status: status },
    { language: language, key: "reset password", value: "Reset Password", status: status },
    { language: language, key: "new password", value: "New Password", status: status },
    { language: language, key: "confirm password is required", value: "Confirm Password Is Required", status: status },
    { language: language, key: "passwords do not match", value: "Passwords Do Not Match", status: status },
    { language: language, key: "your password has been updated", value: "Your Password Has Been Updated", status: status },
    { language: language, key: "email not found", value: "Email Not Found", status: status },
    { language: language, key: "please enter a valid email address", value: "Please Enter a Valid Email Address", status: status },

    

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
