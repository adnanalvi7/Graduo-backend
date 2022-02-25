/**
 * for now its not being used
 */
module.exports = function authPlugin(schema, options?) {
  schema.pre('validate', function (next) {
    this.entity = this.user.entity;
    this.createdBy = this.user._id;
    this.user = undefined;
    console.log(this);
    next()
  });
 }

 /**
  * can be used like this
  * const authPlugin = require('../../../common/middleware/mongoose-auth.middleware');
  * mongoose.plugin(authPlugin);
  */