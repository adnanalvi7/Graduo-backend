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
    { language: language, key: "mailbox", value: "MailBox", status: status },
    { language: language, key: "mark as read", value: "Mark as Read", status: status },
    { language: language, key: "mark as unread", value: "Mark as Unread", status: status },
    { language: language, key: "forward email", value: "Forward Email", status: status },
    { language: language, key: "edit email", value: "Edit Email", status: status },
    { language: language, key: "reply email", value: "Reply Email", status: status },
    { language: language, key: "forward", value: "Forward", status: status },
    { language: language, key: "reply", value: "Reply", status: status },
    { language: language, key: "save to draft", value: "Save To Draft", status: status },
    { language: language, key: "new message", value: "New Message", status: status },
    { language: language, key: "send", value: "Send", status: status },
    { language: language, key: "to", value: "To", status: status },
    { language: language, key: "hide", value: "Hide", status: status },
    { language: language, key: "bcc", value: "BCC", status: status },
    { language: language, key: "cc", value: "CC", status: status },
    { language: language, key: "show", value: "Show", status: status },
    { language: language, key: "read", value: "Read", status: status },
    { language: language, key: "unread", value: "Unread", status: status },
    { language: language, key: "Trash", value: "Trash", status: status },
    { language: language, key: "Sent Mail", value: "Sent Mail", status: status },
    { language: language, key: "Junk", value: "Junk", status: status },
    { language: language, key: "Drafts", value: "Drafts", status: status },
    { language: language, key: "Custom Folder", value: "Custom Folder", status: status },
    { language: language, key: "INBOX", value: "INBOX", status: status },
    { language: language, key: "unimportant", value: "Unimportant", status: status },
    { language: language, key: "important", value: "Important", status: status },
    { language: language, key: "starred", value: "Starred", status: status },
    { language: language, key: "unstarred", value: "Unstarred", status: status },

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
