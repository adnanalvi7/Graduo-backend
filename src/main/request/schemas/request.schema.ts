import * as mongoose from 'mongoose';
import { baseSchema } from 'src/common/base/base.schema';

export const RequestSchema = baseSchema({

  description: String,
  entity: mongoose.Schema.Types.ObjectId,
  type: String,
  subAccount: String,
  comments: String,

}, { collection: 'request' });

RequestSchema.virtual('entityData', {
  ref: 'Entity',
  localField: 'entity',
  foreignField: '_id',
  justOne: true,
});
