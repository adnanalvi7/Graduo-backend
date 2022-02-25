import * as mongoose from 'mongoose';
import { baseSchema } from './../../../common/base/base.schema';

const ObjectId = mongoose.Types.ObjectId;
const String = mongoose.Schema.Types.String;
export const AttachmentsSchema = baseSchema({
  refModel: { type: String, required: true },
  modelId: { type: ObjectId, required: true },
  entity: { type: ObjectId, required: true },
  createdBy: { type: String },
  order: { type: Number, default: 0 },
  document: { type: Boolean, default: false },
  isFolder: Boolean,
  folderName: String,
  publishStatus: Boolean,
  fileName: String,
  fileMd5Name: String,
  fileType: String,
  tableName: String,
  fileSize: Number,
  path: String,
  altDescription: Object,

}, { collection: 'attachments' });
AttachmentsSchema.virtual('user', {
  ref: 'Users',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true,
});

AttachmentsSchema.pre('find', function (next) {
  if (this.getQuery().modelId && typeof this.getQuery().modelId === 'string') {
    this.where({ modelId: ObjectId(this.getQuery().modelId) });
  }
  next();
});

