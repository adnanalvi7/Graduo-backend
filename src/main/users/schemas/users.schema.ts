import * as bcrypt from 'bcrypt';
import { baseSchema } from 'src/common/base/base.schema';
import * as mongoose from 'mongoose';

export const UsersSchema = baseSchema({

  email: { type: String, unique: true },
  localToken: String,
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  facebook: String,
  twitter: String,
  google: String,
  tokens: Array,
  attorneyName: String,
  attorneyId: String,
  userName: String,
  departamentId: String,
  legalName: String,
  // userRole: mongoose.Schema.Types.ObjectId,
  userRole: { type: mongoose.Schema.Types.ObjectId, ref: 'UsersRoles' },
  legalFormId: String,
  legalActivityId: String,
  companyTaxId: String,
  entity: mongoose.Schema.Types.ObjectId,

  googleAddress: {
    country: String,
    region: String,
    province: String,
    city: String,
    postalCode: String,
    street: String,
    streetNumber: String,
    postfixAddress: String,
    longitude: String,
    latitude: String,
    formattedAddress: mongoose.Schema.Types.Mixed
  },

  postalCode: String,
  location: String,
  street: String,
  streetNumber: String,
  postfixAddress: String,
  longitude: String,
  latitude: String,
  telephone: String,
  fax: String,
  gdprId: String,
  quoteId: String,
  policiesId: String,
  Bank1: String,
  AccountHolder1: String,
  Account1: String,
  Clabe1: String,
  Bank2: String,
  AccountHolder2: String,
  Account2: String,
  Clabe2: String,
  subAccount: String,
  balanceId: String,
  commentsText: String,
  active: String,
  recordLimit: Number,
  kardexId: String,
  perfilImg: String,
  shortcuts: mongoose.Schema.Types.Mixed,
  wildduckEmail: String,
  wildduckPassword: String,
  emailSignature: String
}, { collection: 'users' });

UsersSchema.virtual('profileImage', {
  ref: 'Attachments',
  localField: '_id',
  foreignField: 'modelId',
  justOne: true,
});

UsersSchema.virtual('entityData', {
  ref: 'Entity',
  localField: 'entity',
  foreignField: '_id',
  justOne: true,
});

/**
 * Password hash middleware.
 */

UsersSchema.pre("save", function save(next) {

  const user = this as any;
  user.email = user.email.toLowerCase();

  if (!user.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt).then(function (hash) {
      user.password = hash;
      next();
    });
  });
});

/**
 * Password hash.
 */

UsersSchema.pre("updateOne", function save(next) {

  const user = this as any;
  if(user._update.email){
    user._update.email = user._update.email.toLowerCase();
  }

  if (user?._update?.password) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }
      bcrypt.hash(user._update.password, salt).then(function (hash) {
        user._update.password = hash;
        next();
      });
    });
  } else {
    next();
  }


});
