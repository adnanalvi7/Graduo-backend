import * as mongoose from 'mongoose';
import { baseSchema } from 'src/common/base/base.schema';

export const CnaeSchema = baseSchema({
    value: mongoose.Schema.Types.Mixed,
}, { collection: 'cnae' });