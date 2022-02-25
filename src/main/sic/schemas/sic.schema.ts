import * as mongoose from 'mongoose';
import { baseSchema } from 'src/common/base/base.schema';

export const SicSchema = baseSchema({
    value: mongoose.Schema.Types.Mixed,
}, { collection: 'sic' });