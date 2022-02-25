import { baseSchema } from "src/common/base/base.schema";
import * as mongoose from 'mongoose';

export const TransactionsSchema = baseSchema({

  description: String,
  applicantId: mongoose.Schema.Types.ObjectId,
  applicant: String,
  grantsId: String,
  grants: String,
  type: String,
  transInitDate: Date,
  transResolveDate: Date,
  transEndDate: Date,
  tax: Number,
  total: Number,
  payMode: String,
  bankId: String,
  amount: Number,
  bankTransaction: String,
  authorizedDatetime: Date,
  authorizedNumber: Number,
  comments: String,


}, { collection: 'transactions' });

TransactionsSchema.virtual('applicantData', {
  ref: 'Users',
  localField: 'applicantId',
  foreignField: 'number_id',
  justOne: false,
});
