import { baseSchema } from 'src/common/base/base.schema';
import * as mongoose from 'mongoose';

export const TransactionsBalanceSchema = baseSchema({
  operationId: String,
  balanceId: String,
  entity: Number,
  userId: mongoose.Schema.Types.ObjectId,
  balance: Number,
  transactionId: mongoose.Schema.Types.ObjectId,

}, { collection: 'transactions_balance' });

TransactionsBalanceSchema.virtual('TransactionData', {
  ref: 'Transactions',
  localField: 'transactionId',
  foreignField: '_id',
  justOne: false,
});

TransactionsBalanceSchema.virtual('userData', {
  ref: 'Users',
  localField: 'userId',
  foreignField: '_id',
  justOne: false,
});
